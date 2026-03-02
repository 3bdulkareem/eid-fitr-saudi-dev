import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { generateImage } from "./_core/imageGeneration";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Image generation router
  image: router({
    generate: publicProcedure
      .input(
        z.object({
          prompt: z.string().min(10),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await generateImage({
            prompt: input.prompt,
          });
          return {
            success: true,
            url: result.url,
          };
        } catch (error) {
          console.error("Image generation error:", error);
          throw new Error("Failed to generate image. Please try again.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
