import { useState, useEffect, useRef } from 'react'
import { 
  Gift, Calendar, MapPin, ChefHat, Sparkles, 
  Moon, Sun, Clock, Users, Heart, Share2,
  Plus, Trash2, Check, Wand2,
  Utensils, Music, Flame, Star, Home, Zap, Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import './App.css'

// Types
interface EidiyahEntry {
  id: string
  name: string
  amount: number
  category: 'child' | 'family' | 'other'
}

interface Visit {
  id: string
  familyName: string
  date: string
  time: string
  location: string
  notes: string
  completed: boolean
}

interface Event {
  id: string
  title: string
  city: string
  date: string
  time: string
  location: string
  type: 'concert' | 'theater' | 'fireworks' | 'family'
  price?: string
}

interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string[]
  instructions: string[]
  region: string
  image: string
}

// Nano Banana Card Designs - Modern 3D Style
const nanoBananaDesigns = [
  { 
    id: 1, 
    name: 'الزمردي النيون',
    bg: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600',
    accent: 'bg-emerald-300/30',
    shadow: 'shadow-emerald-500/50',
    textColor: 'text-white',
    decoration: '💎'
  },
  { 
    id: 2, 
    name: 'الذهبي الملكي',
    bg: 'bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500',
    accent: 'bg-amber-200/40',
    shadow: 'shadow-amber-500/50',
    textColor: 'text-amber-900',
    decoration: '👑'
  },
  { 
    id: 3, 
    name: 'الوردي الفاخر',
    bg: 'bg-gradient-to-br from-pink-400 via-rose-500 to-fuchsia-600',
    accent: 'bg-pink-300/30',
    shadow: 'shadow-pink-500/50',
    textColor: 'text-white',
    decoration: '🌸'
  },
  { 
    id: 4, 
    name: 'البنفسجي الكوني',
    bg: 'bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600',
    accent: 'bg-violet-300/30',
    shadow: 'shadow-violet-500/50',
    textColor: 'text-white',
    decoration: '✨'
  },
  { 
    id: 5, 
    name: 'الأزرق المحيط',
    bg: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600',
    accent: 'bg-cyan-300/30',
    shadow: 'shadow-cyan-500/50',
    textColor: 'text-white',
    decoration: '🌊'
  },
  { 
    id: 6, 
    name: 'المرجاني الحيوي',
    bg: 'bg-gradient-to-br from-coral-400 via-red-400 to-pink-500',
    accent: 'bg-red-300/30',
    shadow: 'shadow-red-500/50',
    textColor: 'text-white',
    decoration: '🔥'
  },
]

// Prompt Templates for Nano Banana
const nanoBananaPrompts = [
  {
    id: '1',
    title: 'تصميم عيد فاخر',
    category: 'فاخر',
    emoji: '✨',
    prompt: 'صمم بطاقة تهنئة بعيد الفطر المبارك بأسلوب فاخر وراقٍ، استخدم ألوان الذهبي والأخضر الزمردي، أضف زخارف إسلامية هندسية، خلفية داكنة بتدرجات ناعمة، نص عربي خطي بخط نسخ جميل يقول "عيد مبارك وكل عام وأنتم بخير"، أضف هلال وقبة مسجد بأسلوب minimalist.',
    tips: ['استخدم خلفية داكنة للحصول على مظهر فاخر', 'الألوان الذهبية تعطي إحساس الفخامة']
  },
  {
    id: '2',
    title: 'تصميم عيد حديث',
    category: 'حديث',
    emoji: '🎨',
    prompt: 'اصنع تصميم عيد الفطر بأسلوب عصري وحديث، استخدم ألوان نيون زاهية (أخضر نيون وأزرق سماوي)، أضف أشكال هندسية عصرية وتدرجات gradient، نص عربي بخط عصري يقول "عيد مبارك"، خلفية بيضاء أو رمادية فاتحة، أضف تأثيرات ضوئية وبريق.',
    tips: ['الألوان النيون تناسب منصات التواصل الاجتماعي', 'الأسلوب الحديث يجذب الجمهور الشاب']
  },
  {
    id: '3',
    title: 'تصميم عائلي دافئ',
    category: 'عائلي',
    emoji: '👨‍👩‍👧‍👦',
    prompt: 'صمم بطاقة عيد الفطر بأسلوب عائلي دافئ ومبهج، استخدم ألوان دافئة (برتقالي، أصفر، وردي فاتح)، أضف رسوم كرتونية لعائلة سعيدة بالزي السعودي، خلفية بيضاء ناصعة، نص عربي ملون يقول "عيد مبارك لعائلتنا الحبيبة"، أضف نجوم وقلوب وزخارف مرحة.',
    tips: ['الألوان الدافئة تعطي إحساس الدفء والمحبة', 'مناسب لمشاركة مع العائلة والأصدقاء']
  },
  {
    id: '4',
    title: 'تصميم ديني أصيل',
    category: 'ديني',
    emoji: '🕌',
    prompt: 'اصنع تصميم عيد الفطر بأسلوب إسلامي أصيل، استخدم ألوان الأخضر والأبيض والذهبي، أضف زخارف إسلامية تقليدية (أرابيسك)، صورة مسجد أو هلال وقمر، نص قرآني أو دعاء بخط عربي جميل، خلفية بنمط إسلامي هندسي، أضف نجمة وهلال.',
    tips: ['الأنماط الإسلامية تضيف عمقاً ثقافياً', 'مناسب للمناسبات الدينية']
  },
  {
    id: '5',
    title: 'تصميم احتفالي مبهج',
    category: 'احتفالي',
    emoji: '🎉',
    prompt: 'صمم بطاقة عيد الفطر احتفالية ومبهجة، استخدم ألوان زاهية ومتعددة (أحمر، أصفر، أزرق، أخضر)، أضف ألعاب نارية وبالونات وقصاصات ورق ملونة، نص كبير وجريء يقول "عيد مبارك"، خلفية داكنة لإبراز الألوان، أضف تأثيرات confetti.',
    tips: ['الألوان المتعددة تعطي إحساس الاحتفال', 'مناسب للنشر في يوم العيد مباشرة']
  },
  {
    id: '6',
    title: 'تصميم سعودي تقليدي',
    category: 'تقليدي',
    emoji: '🇸🇦',
    prompt: 'اصنع تصميم عيد الفطر بالهوية السعودية، استخدم ألوان العلم السعودي (أخضر وأبيض)، أضف صورة الكعبة المشرفة أو مسجد الملك عبدالله، زخارف سعودية تقليدية، نص بخط عربي أصيل يقول "عيد مبارك من أرض الحرمين"، أضف نخلة وسيف بأسلوب فني.',
    tips: ['الهوية السعودية تضيف طابعاً وطنياً', 'مناسب لمشاركة مع الأصدقاء والزملاء']
  },
  {
    id: '7',
    title: 'تصميم فني إبداعي',
    category: 'فني',
    emoji: '🎭',
    prompt: 'صمم بطاقة عيد الفطر بأسلوب فني إبداعي، استخدم تقنية watercolor أو oil painting، ألوان متدرجة وناعمة (بنفسجي، وردي، أزرق)، أضف عناصر طبيعية (زهور، أوراق شجر)، نص بخط يدوي جميل يقول "عيد مبارك"، خلفية بتأثير ورق قديم أو كانفاس.',
    tips: ['أسلوب الألوان المائية يعطي مظهراً فنياً رائياً', 'مناسب للمصممين ومحبي الفن']
  },
  {
    id: '8',
    title: 'تصميم للأطفال',
    category: 'أطفال',
    emoji: '🧒',
    prompt: 'اصنع تصميم عيد الفطر للأطفال بأسلوب كرتوني مرح، استخدم ألوان زاهية وبراقة، أضف شخصيات كرتونية سعيدة، هلال وقمر بوجه مبتسم، نجوم ملونة، نص كبير وملون يقول "عيد مبارك يا صغيري"، أضف حلوى وكعك العيد بأسلوب كرتوني.',
    tips: ['الأسلوب الكرتوني يناسب الأطفال', 'الألوان الزاهية تجذب انتباه الأطفال']
  },
]

const designSizes = [
  { id: '1', name: 'سناب شات', dimensions: '1080 × 1920', aspectRatio: '9:16', platform: 'Snapchat', icon: '👻' },
  { id: '2', name: 'انستقرام - مربع', dimensions: '1080 × 1080', aspectRatio: '1:1', platform: 'Instagram', icon: '📷' },
  { id: '3', name: 'انستقرام - ستوري', dimensions: '1080 × 1920', aspectRatio: '9:16', platform: 'Instagram', icon: '📱' },
  { id: '4', name: 'تيك توك', dimensions: '1080 × 1920', aspectRatio: '9:16', platform: 'TikTok', icon: '🎵' },
  { id: '5', name: 'تويتر/إكس', dimensions: '1200 × 675', aspectRatio: '16:9', platform: 'Twitter/X', icon: '🐦' },
  { id: '6', name: 'فيسبوك - منشور', dimensions: '1200 × 630', aspectRatio: '1.91:1', platform: 'Facebook', icon: '👍' },
  { id: '7', name: 'مستطيل أفقي', dimensions: '1920 × 1080', aspectRatio: '16:9', platform: 'عام', icon: '🖥️' },
  { id: '8', name: 'مستطيل عمودي', dimensions: '1080 × 1350', aspectRatio: '4:5', platform: 'عام', icon: '📄' },
]

function NanoBananaPromptsSection() {
  const [selectedPrompt, setSelectedPrompt] = useState(nanoBananaPrompts[0])
  const [selectedSize, setSelectedSize] = useState(designSizes[0])
  const [customName, setCustomName] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const buildFinalPrompt = () => {
    let finalPrompt = selectedPrompt.prompt
    if (customName) finalPrompt += ` اكتب اسم "${customName}" على البطاقة.`
    if (customMessage) finalPrompt += ` أضف رسالة خاصة: "${customMessage}".`
    finalPrompt += ` المقاس المطلوب: ${selectedSize.dimensions} (${selectedSize.aspectRatio}) مناسب لـ ${selectedSize.platform}.`
    return finalPrompt
  }

  const copyPrompt = () => {
    const prompt = buildFinalPrompt()
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(true)
    toast.success('تم نسخ البرومبت! الصقه الآن في نانو بنانا 🍌')
    setTimeout(() => setCopiedPrompt(false), 3000)
  }

  const sharePrompt = async () => {
    const prompt = buildFinalPrompt()
    if (navigator.share) {
      try {
        await navigator.share({ title: 'برومبت عيد الفطر', text: prompt })
      } catch {
        copyPrompt()
      }
    } else {
      copyPrompt()
    }
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full">
          <Zap className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-700 dark:text-emerald-300 font-medium text-sm">برومبتات جاهزة لنانو بنانا</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          🍌 مولد برومبتات عيد الفطر
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          اختر البرومبت المناسب، حدد المقاس، ثم انسخه مباشرة إلى أداة نانو بنانا لإنشاء تصميمك
        </p>
      </div>

      {/* How to use guide */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
        <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
          <span className="text-lg">📖</span> دليل الاستخدام
        </h4>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { step: '1', text: 'اختر البرومبت المناسب من القائمة' },
            { step: '2', text: 'حدد مقاس التصميم للمنصة المطلوبة' },
            { step: '3', text: 'أضف اسمك أو رسالتك الخاصة (اختياري)' },
            { step: '4', text: 'انسخ البرومبت والصقه في نانو بنانا' },
          ].map(item => (
            <div key={item.step} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{item.step}</span>
              <p className="text-sm text-amber-700 dark:text-amber-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Selection Panel */}
        <div className="space-y-6">
          {/* Prompt Selection */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span>🎨</span> اختر نوع التصميم
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {nanoBananaPrompts.map(prompt => (
                <button
                  key={prompt.id}
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`text-right p-3 rounded-xl border-2 transition-all ${
                    selectedPrompt.id === prompt.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{prompt.emoji}</span>
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{prompt.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{prompt.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span>📐</span> اختر مقاس التصميم
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {designSizes.map(size => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`text-right p-3 rounded-xl border-2 transition-all ${
                    selectedSize.id === size.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{size.icon}</span>
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{size.name}</span>
                  </div>
                  <p className="text-xs text-gray-500">{size.dimensions}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">{size.platform}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Optional customization */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span>✏️</span> تخصيص إضافي (اختياري)
            </h4>
            <div className="space-y-2">
              <Label className="text-sm">اسم شخصي على البطاقة</Label>
              <Input
                placeholder="مثال: أبو محمد، العائلة الكريمة..."
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                className="border-2 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">رسالة خاصة</Label>
              <Textarea
                placeholder="مثال: تقبل الله منا ومنكم..."
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                className="border-2 focus:border-emerald-500 resize-none"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Right: Preview & Copy */}
        <div className="space-y-4">
          {/* Selected info */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">البرومبت الجاهز</h4>
              <div className="flex gap-2">
                <span className="text-xs bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full">
                  {selectedPrompt.emoji} {selectedPrompt.category}
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                  {selectedSize.icon} {selectedSize.name}
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed border border-gray-200 dark:border-gray-700 min-h-[140px] whitespace-pre-wrap">
              {buildFinalPrompt()}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm">💡 نصائح لهذا البرومبت</h5>
            <ul className="space-y-1">
              {selectedPrompt.tips.map((tip, idx) => (
                <li key={idx} className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Size info */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-sm">📐 معلومات المقاس</h5>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-500">الأبعاد</p>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{selectedSize.dimensions}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">النسبة</p>
                <p className="font-bold text-emerald-600 text-sm">{selectedSize.aspectRatio}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">المنصة</p>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{selectedSize.platform}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={copyPrompt}
              className={`flex-1 py-6 font-bold text-base rounded-xl transition-all ${
                copiedPrompt
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30'
              }`}
            >
              {copiedPrompt ? (
                <><Check className="w-5 h-5 ml-2" />تم النسخ!</>
              ) : (
                <><Copy className="w-5 h-5 ml-2" />انسخ البرومبت</>  
              )}
            </Button>
            <Button
              variant="outline"
              onClick={sharePrompt}
              className="px-4 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-center text-xs text-gray-400">
            بعد النسخ، افتح <strong>نانو بنانا</strong> والصق البرومبت في خانة الوصف
          </p>
        </div>
      </div>
    </div>
  )
}

// Classic Eid Messages
const eidMessages = [
  'كل عام وأنتم بخير، تقبل الله منا ومنكم صالح الأعمال',
  'عيد مبارك، أعاده الله علينا وعليكم باليمن والبركات',
  'عساكم من عواده، وكل عام وأنتم إلى الله أقرب',
  'أهل الله عليكم الأيام بفرح وسعادة، عيد مبارك',
  'كل عام وأنتم بألف خير، وجعل الله أيامكم كلها أعياد'
]

const cities = ['الرياض', 'جدة', 'الدمام', 'الخبر', 'أبها', 'الطائف', 'القصيم', 'تبوك', 'المدينة المنورة', 'مكة المكرمة']

const eventsData: Event[] = [
  { id: '1', title: 'حفل رابح صقر', city: 'شقراء', date: '3 أبريل', time: '9:00 م', location: 'مسرح المهندس محمد بن سعد البواردي', type: 'concert', price: 'من 200 ريال' },
  { id: '2', title: 'حفل مي فاروق ونواف الجبرتي', city: 'الرياض', date: '3 أبريل', time: '9:00 م', location: 'مسرح أبو بكر سالم - بوليفارد سيتي', type: 'concert', price: 'من 250 ريال' },
  { id: '3', title: 'حفل راشد الفارس وعايض', city: 'الرياض', date: '4 أبريل', time: '9:00 م', location: 'محمد عبده أرينا', type: 'concert', price: 'من 300 ريال' },
  { id: '4', title: 'حفل تامر عاشور', city: 'جدة', date: '4 أبريل', time: '9:00 م', location: 'شاطئ شيدز - درة العروس', type: 'concert', price: 'من 350 ريال' },
  { id: '5', title: 'حفل خالد عبدالرحمن', city: 'أبها', date: '4 أبريل', time: '9:00 م', location: 'مسرح جامعة الملك خالد', type: 'concert', price: 'من 200 ريال' },
  { id: '6', title: 'حفل فهد الكبيسي وسلطان خليفة', city: 'أبها', date: '5 أبريل', time: '9:00 م', location: 'مسرح جامعة الملك خالد', type: 'concert', price: 'من 180 ريال' },
  { id: '7', title: 'مسرحية الشنطة', city: 'الرياض', date: '1-19 أبريل', time: 'متنوع', location: 'مسرح بكر الشدي', type: 'theater', price: 'من 70 ريال' },
  { id: '8', title: 'مسرحية شمس وقمر', city: 'جدة', date: '1-6 أبريل', time: 'متنوع', location: 'المسرح العربي', type: 'theater', price: 'من 100 ريال' },
  { id: '9', title: 'مسرحية الورثة', city: 'الدمام', date: '1-3 أبريل', time: 'متنوع', location: 'مسرح كلية المانع الطبية', type: 'theater', price: 'من 80 ريال' },
  { id: '10', title: 'عرض الألعاب النارية', city: 'الرياض', date: '1 أبريل', time: '9:00 م', location: 'بوليفارد وورلد', type: 'fireworks', price: 'مجاني' },
  { id: '11', title: 'عرض الألعاب النارية', city: 'جدة', date: '1 أبريل', time: '9:00 م', location: 'ممشى آرت بروميناد', type: 'fireworks', price: 'مجاني' },
  { id: '12', title: 'عرض الألعاب النارية', city: 'الخبر', date: '1 أبريل', time: '9:00 م', location: 'كورنيش الخبر', type: 'fireworks', price: 'مجاني' },
]

const recipesData: Recipe[] = [
  {
    id: '1',
    name: 'الكليجة',
    description: 'كعك العيد التقليدي المحشو بالتمر والمكسرات',
    ingredients: ['3 كيلو سميد ناعم', 'سمن حيواني', 'سكر ناعم', 'حليب ناشف', 'عجوة (تمر منزوع النوى)', 'قرفة', 'يانسون', 'مكسرات محمصة ومطحونة'],
    instructions: ['يخلط السميد مع السمن والسكر والحليب', 'تضاف البهارات ويعجن بالماء الدافئ', 'تحضير الحشوة بخلط العجوة مع القرفة والمكسرات', 'تشكيل العجينة وتحشى بالعجوة', 'تخبز في فرن متوسط الحرارة حتى تحمر'],
    region: 'منطقة الوسطى',
    image: 'kleija'
  },
  {
    id: '2',
    name: 'العريكة',
    description: 'طبق تقليدي من العجين بالتمر والسمن',
    ingredients: ['دقيق', 'تمر', 'سمن', 'سكر', 'ماء', 'ملح'],
    instructions: ['يعجن الدقيق مع الماء والملح', 'تفرد العجينة في صينية', 'توزع التمر المهروس على الوجه', 'تدهن بالسمن وتخبز', 'تقدم ساخنة مع السمن والعسل'],
    region: 'المنطقة الجنوبية',
    image: 'areeka'
  },
  {
    id: '3',
    name: 'المبثوث',
    description: 'طبق شعبي من الخبز المفتت بالسمن والتمر',
    ingredients: ['خبز شراك', 'سمن بلدي', 'تمر', 'عسل', 'حليب'],
    instructions: ['يفتت الخبز في وعاء', 'يسخن الحليب ويضاف للخبز', 'يضاف السمن والتمر المفتت', 'يخلط جيداً ويقدم ساخناً'],
    region: 'المنطقة الشرقية',
    image: 'mabthooth'
  },
  {
    id: '4',
    name: 'الحنيني',
    description: 'حلوى تقليدية من الخبز والتمر والسمن',
    ingredients: ['خبز رقاق', 'تمر', 'سمن', 'حليب', 'هيل', 'زعفران'],
    instructions: ['يقطع الخبز ويوزع في صينية', 'يوزع التمر فوق الخبز', 'يخلط الحليب مع السمن والهيل', 'يسكب الخليط على الخبز والتمر', 'يدخل الفرن حتى ينضج'],
    region: 'منطقة الرياض',
    image: 'haneeni'
  },
  {
    id: '5',
    name: 'اللقيمات',
    description: 'كرات مقلية مقرمشة بالعسل أو الشيرة',
    ingredients: ['دقيق', 'خميرة', 'سكر', 'ماء ورد', 'زيت للقلي', 'عسل أو شيرة'],
    instructions: ['يخلط الدقيق مع الخميرة والسكر', 'يضاف ماء الورد ويعجن', 'يترك الخليط ليتخمر', 'تشكل كرات صغيرة وتقلى', 'تغمس في العسل أو الشيرة'],
    region: 'مكة المكرمة',
    image: 'luqaimat'
  },
  {
    id: '6',
    name: 'الدبيازة',
    description: 'حلوى تقليدية من المشمش والمكسرات والتمر',
    ingredients: ['مشمش مجفف', 'تمر مجفف', 'لوز', 'جوز', 'سكر', 'ماء الورد'],
    instructions: ['ينقع المشمش والتمر في الماء', 'يطحن مع المكسرات', 'يضاف السكر وماء الورد', 'يشكل على شكل أقراص', 'يجفف في الشمس أو الفرن'],
    region: 'مكة والمنطقة الغربية',
    image: 'dabeza'
  }
]

// Nano Banana Card Component
interface NanoCard {
  id: string
  to: string
  from: string
  message: string
  poem: string[]
  designId: number
  createdAt: number
}

function NanoBananaCardSection() {
  const [cards, setCards] = useState<NanoCard[]>([])
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')
  const [selectedDesign, setSelectedDesign] = useState(1)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentDesign = nanoBananaDesigns.find(d => d.id === selectedDesign) || nanoBananaDesigns[0]

  const createCard = () => {
    if (!to || !from) {
      toast.error('الرجاء إدخال اسم المرسل والمستلم')
      return
    }
    const newCard: NanoCard = {
      id: Date.now().toString(),
      to,
      from,
      message: message || 'كل عام وأنتم بخير',
      poem: [],
      designId: selectedDesign,
      createdAt: Date.now()
    }
    setCards([newCard, ...cards])
    toast.success('تم إنشاء البطاقة بنجاح! 🎉')
  }

  const deleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id))
    toast.success('تم حذف البطاقة')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('تم نسخ النص')
  }

  const shareCard = async (card: NanoCard) => {
    const shareText = `بطاقة تهنئة من ${card.from} إلى ${card.to}\n\n${card.message}\n\nعيد مبارك! 🌙`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'بطاقة تهنئة بالعيد',
          text: shareText
        })
      } catch {
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
          بطاقات Nano Banana 🍌
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          صمم بطاقة تهنئة عصرية بألوان نيون مذهلة مع عناصر إسلامية جميلة
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wand2 className="w-5 h-5 text-emerald-500" />
              صمم بطاقتك
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">المرسل إليه</Label>
                <Input
                  placeholder="اسم المستلم"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  className="border-2 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">المرسل</Label>
                <Input
                  placeholder="اسم المرسل"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  className="border-2 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">رسالتك</Label>
              <Textarea
                placeholder="اكتب رسالة التهنئة..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                className="border-2 focus:border-emerald-500 transition-colors resize-none"
              />
              <div className="flex flex-wrap gap-2">
                {eidMessages.slice(0, 3).map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(msg)}
                    className="text-xs bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full hover:from-emerald-100 hover:to-teal-100 transition border border-emerald-200 dark:border-emerald-800"
                  >
                    {msg.substring(0, 25)}...
                  </button>
                ))}
              </div>
            </div>

                        {/* Design Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">التصميم</Label>
              <div className="grid grid-cols-3 gap-3">
                {nanoBananaDesigns.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design.id)}
                    className={`relative h-20 rounded-2xl ${design.bg} ${design.shadow} shadow-lg transition-all duration-300 ${
                      selectedDesign === design.id 
                        ? 'scale-105 ring-4 ring-offset-2 ring-emerald-500 ring-offset-white dark:ring-offset-gray-800' 
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span className="absolute top-2 right-2 text-xl">{design.decoration}</span>
                    <span className={`absolute bottom-2 left-2 text-xs font-bold ${design.textColor}`}>
                      {design.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={createCard}
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              إنشاء البطاقة
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">معاينة البطاقة</h4>
          
          {/* The Card */}
          <div 
            ref={cardRef}
            className={`relative overflow-hidden rounded-3xl ${currentDesign.bg} p-8 min-h-[400px] flex flex-col justify-between ${currentDesign.shadow} shadow-2xl transition-all duration-500`}
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Floating shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
              
              {/* Geometric patterns */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-12" />
              <div className="absolute top-4 right-4 w-6 h-6 bg-white/10 rounded-full" />
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/10 rounded-full" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white/20 rounded-xl -rotate-12" />
              
              {/* Stars */}
              <div className="absolute top-8 left-1/4 text-white/30 text-xl">✦</div>
              <div className="absolute top-16 right-1/4 text-white/20 text-lg">✦</div>
              <div className="absolute bottom-16 left-1/3 text-white/25 text-sm">✦</div>
            </div>

            {/* Card Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="text-5xl mb-2">{currentDesign.decoration}</div>
                <h2 className={`text-3xl font-bold ${currentDesign.textColor}`}>عيد مبارك</h2>
                <div className={`w-20 h-1 mx-auto rounded-full ${currentDesign.accent}`} />
              </div>

              {/* Recipient */}
              <div className={`text-xl ${currentDesign.textColor} opacity-90`}>
                إلى: <span className="font-bold">{to || '...'}</span>
              </div>

              {/* Message */}
              {message && (
                <div className={`${currentDesign.accent} rounded-2xl p-4 backdrop-blur-sm`}>
                  <p className={`${currentDesign.textColor} text-lg leading-relaxed`}>{message}</p>
                </div>
              )}



              {/* Sender */}
              <div className={`${currentDesign.textColor} opacity-90`}>
                من: <span className="font-bold">{from || '...'}</span>
              </div>

              {/* Footer */}
              <div className={`text-xs ${currentDesign.textColor} opacity-60 pt-4`}>
                عيدية - منصة العيد السعودي 🌙
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {to && from && (
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-2"
                onClick={() => {
                  const cardData = { to, from, message, poem: [], designId: selectedDesign }
                  shareCard(cardData as NanoCard)
                }}
              >
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Saved Cards */}
      {cards.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">بطاقاتي المحفوظة</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const design = nanoBananaDesigns.find(d => d.id === card.designId) || nanoBananaDesigns[0]
              return (
                <Card key={card.id} className="overflow-hidden border-0 shadow-xl group">
                  <div className={`relative overflow-hidden ${design.bg} p-6 min-h-[280px] flex flex-col justify-between`}>
                    {/* Background effects */}
                    <div className="absolute inset-0">
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white/10 rounded-full blur-lg" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center space-y-3">
                      <div className="text-3xl">{design.decoration}</div>
                      <h4 className={`text-xl font-bold ${design.textColor}`}>عيد مبارك</h4>
                      <p className={`text-sm ${design.textColor} opacity-90`}>إلى: {card.to}</p>
                      <p className={`text-xs ${design.textColor} opacity-80 line-clamp-2`}>{card.message}</p>
                      {card.poem.length > 0 && (
                        <p className={`text-xs ${design.textColor} opacity-60 italic`}>
                          {card.poem[0]}...
                        </p>
                      )}
                      <p className={`text-xs ${design.textColor} opacity-90`}>من: {card.from}</p>
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                    <span className="text-xs text-gray-400">
                      {new Date(card.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => shareCard(card)}>
                        <Share2 className="w-4 h-4 text-emerald-500" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteCard(card.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}


    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('cards')
  const [darkMode, setDarkMode] = useState(false)
  
  // Eidiyah Calculator State
  const [eidiyahEntries, setEidiyahEntries] = useState<EidiyahEntry[]>([])
  const [newEntry, setNewEntry] = useState({ name: '', amount: '', category: 'child' as const })
  
  // Visits State
  const [visits, setVisits] = useState<Visit[]>([])
  const [newVisit, setNewVisit] = useState({ familyName: '', date: '', time: '', location: '', notes: '' })
  
  // Events Filter
  const [selectedCity, setSelectedCity] = useState('الكل')
  const [eventType, setEventType] = useState('الكل')

  // Countdown
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2025-03-30T00:00:00').getTime()
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Eidiyah Functions
  const addEidiyahEntry = () => {
    if (!newEntry.name || !newEntry.amount) {
      toast.error('الرجاء إدخال الاسم والمبلغ')
      return
    }
    const entry: EidiyahEntry = {
      id: Date.now().toString(),
      name: newEntry.name,
      amount: Number(newEntry.amount),
      category: newEntry.category
    }
    setEidiyahEntries([...eidiyahEntries, entry])
    setNewEntry({ name: '', amount: '', category: 'child' })
    toast.success('تم إضافة العيدية')
  }

  const deleteEidiyahEntry = (id: string) => {
    setEidiyahEntries(eidiyahEntries.filter(e => e.id !== id))
  }

  const totalEidiyah = eidiyahEntries.reduce((sum, e) => sum + e.amount, 0)

  // Visits Functions
  const addVisit = () => {
    if (!newVisit.familyName || !newVisit.date) {
      toast.error('الرجاء إدخال اسم العائلة والتاريخ')
      return
    }
    const visit: Visit = {
      id: Date.now().toString(),
      ...newVisit,
      completed: false
    }
    setVisits([...visits, visit])
    setNewVisit({ familyName: '', date: '', time: '', location: '', notes: '' })
    toast.success('تم إضافة الزيارة')
  }

  const toggleVisitComplete = (id: string) => {
    setVisits(visits.map(v => v.id === id ? { ...v, completed: !v.completed } : v))
  }

  const deleteVisit = (id: string) => {
    setVisits(visits.filter(v => v.id !== id))
  }

  // Filtered Events
  const filteredEvents = eventsData.filter(event => {
    const cityMatch = selectedCity === 'الكل' || event.city === selectedCity
    const typeMatch = eventType === 'الكل' || event.type === eventType
    return cityMatch && typeMatch
  })

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'concert': return <Music className="w-4 h-4" />
      case 'theater': return <Star className="w-4 h-4" />
      case 'fireworks': return <Flame className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'concert': return 'حفل غنائي'
      case 'theater': return 'مسرحية'
      case 'fireworks': return 'ألعاب نارية'
      default: return 'فعالية'
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">عيدية</h1>
                  <p className="text-emerald-100 text-sm">منصة العيد السعودي المتكاملة</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-white hover:bg-white/20"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section with Countdown */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-amber-500/10 to-emerald-600/10" />
          <div className="container mx-auto px-4 py-12 relative">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                <Home className="w-4 h-4 ml-1" />
                عيد الفطر المبارك 1446هـ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
                كل عام وأنتم بخير
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                اجعل عيدك هذا العام مميزاً مع منصة عيدية - كل ما تحتاجه في مكان واحد
              </p>
              
              {/* Countdown */}
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {[
                  { value: countdown.days, label: 'يوم' },
                  { value: countdown.hours, label: 'ساعة' },
                  { value: countdown.minutes, label: 'دقيقة' },
                  { value: countdown.seconds, label: 'ثانية' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-emerald-100 dark:border-emerald-800">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm mb-8">
              <TabsTrigger value="cards" className="flex-1 min-w-[120px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                <Heart className="w-4 h-4 ml-2" />
                بطاقات التهنئة
              </TabsTrigger>
              <TabsTrigger value="eidiyah" className="flex-1 min-w-[120px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                <Gift className="w-4 h-4 ml-2" />
                حاسبة العيدية
              </TabsTrigger>
              <TabsTrigger value="visits" className="flex-1 min-w-[120px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                <Calendar className="w-4 h-4 ml-2" />
                جدولة الزيارات
              </TabsTrigger>
              <TabsTrigger value="events" className="flex-1 min-w-[120px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                <MapPin className="w-4 h-4 ml-2" />
                فعاليات العيد
              </TabsTrigger>
              <TabsTrigger value="recipes" className="flex-1 min-w-[120px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                <ChefHat className="w-4 h-4 ml-2" />
                وصفات العيد
              </TabsTrigger>
              <TabsTrigger value="prompts" className="flex-1 min-w-[120px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                <Zap className="w-4 h-4 ml-2" />
                برومبتات نانو بنانا
              </TabsTrigger>
            </TabsList>

            {/* Eid Cards Tab - Nano Banana */}
            <TabsContent value="cards" className="space-y-6">
              <NanoBananaCardSection />
            </TabsContent>

            {/* Eidiyah Calculator Tab */}
            <TabsContent value="eidiyah" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Add Entry Form */}
                <Card className="lg:col-span-1 border-emerald-100 dark:border-emerald-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <Gift className="w-5 h-5" />
                      إضافة عيدية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>الاسم</Label>
                      <Input
                        placeholder="اسم الشخص"
                        value={newEntry.name}
                        onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>المبلغ (ريال)</Label>
                      <Input
                        type="number"
                        placeholder="المبلغ"
                        value={newEntry.amount}
                        onChange={e => setNewEntry({ ...newEntry, amount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الفئة</Label>
                      <Select
                        value={newEntry.category}
                        onValueChange={(v: any) => setNewEntry({ ...newEntry, category: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="child">طفل</SelectItem>
                          <SelectItem value="family">عائلة</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={addEidiyahEntry} className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة
                    </Button>
                  </CardContent>
                </Card>

                {/* Summary & List */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalEidiyah}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي العيديات</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                          {eidiyahEntries.filter(e => e.category === 'child').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">عدد الأطفال</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                          {eidiyahEntries.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي المستلمين</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Entries List */}
                  <Card className="border-emerald-100 dark:border-emerald-800">
                    <CardHeader>
                      <CardTitle className="text-emerald-700 dark:text-emerald-300">قائمة العيديات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {eidiyahEntries.length === 0 ? (
                        <p className="text-center text-gray-400 py-8">لا توجد عيديات مضافة</p>
                      ) : (
                        <div className="space-y-2">
                          {eidiyahEntries.map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  entry.category === 'child' ? 'bg-amber-100 text-amber-600' :
                                  entry.category === 'family' ? 'bg-emerald-100 text-emerald-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {entry.category === 'child' ? <Users className="w-5 h-5" /> :
                                   entry.category === 'family' ? <Heart className="w-5 h-5" /> :
                                   <Gift className="w-5 h-5" />}
                                </div>
                                <div>
                                  <p className="font-medium">{entry.name}</p>
                                  <Badge variant="secondary" className="text-xs">
                                    {entry.category === 'child' ? 'طفل' :
                                     entry.category === 'family' ? 'عائلة' : 'أخرى'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{entry.amount} ريال</span>
                                <Button variant="ghost" size="sm" onClick={() => deleteEidiyahEntry(entry.id)}>
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Visits Tab */}
            <TabsContent value="visits" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Add Visit Form */}
                <Card className="lg:col-span-1 border-emerald-100 dark:border-emerald-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <Calendar className="w-5 h-5" />
                      إضافة زيارة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>اسم العائلة</Label>
                      <Input
                        placeholder="اسم العائلة"
                        value={newVisit.familyName}
                        onChange={e => setNewVisit({ ...newVisit, familyName: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>التاريخ</Label>
                        <Input
                          type="date"
                          value={newVisit.date}
                          onChange={e => setNewVisit({ ...newVisit, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>الوقت</Label>
                        <Input
                          type="time"
                          value={newVisit.time}
                          onChange={e => setNewVisit({ ...newVisit, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>الموقع</Label>
                      <Input
                        placeholder="الحي / المنطقة"
                        value={newVisit.location}
                        onChange={e => setNewVisit({ ...newVisit, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ملاحظات</Label>
                      <Textarea
                        placeholder="أي ملاحظات إضافية..."
                        value={newVisit.notes}
                        onChange={e => setNewVisit({ ...newVisit, notes: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <Button onClick={addVisit} className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة الزيارة
                    </Button>
                  </CardContent>
                </Card>

                {/* Visits List */}
                <div className="lg:col-span-2">
                  <Card className="border-emerald-100 dark:border-emerald-800">
                    <CardHeader>
                      <CardTitle className="text-emerald-700 dark:text-emerald-300">جدول زيارات العيد</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {visits.length === 0 ? (
                        <p className="text-center text-gray-400 py-8">لا توجد زيارات مجدولة</p>
                      ) : (
                        <div className="space-y-3">
                          {visits.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((visit) => (
                            <div
                              key={visit.id}
                              className={`p-4 rounded-lg border transition ${
                                visit.completed
                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <button
                                    onClick={() => toggleVisitComplete(visit.id)}
                                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                      visit.completed
                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                        : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                  >
                                    {visit.completed && <Check className="w-4 h-4" />}
                                  </button>
                                  <div>
                                    <h4 className={`font-semibold ${visit.completed ? 'line-through text-gray-500' : ''}`}>
                                      {visit.familyName}
                                    </h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {visit.date}
                                      </span>
                                      {visit.time && (
                                        <span className="flex items-center gap-1">
                                          <Clock className="w-4 h-4" />
                                          {visit.time}
                                        </span>
                                      )}
                                      {visit.location && (
                                        <span className="flex items-center gap-1">
                                          <MapPin className="w-4 h-4" />
                                          {visit.location}
                                        </span>
                                      )}
                                    </div>
                                    {visit.notes && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{visit.notes}</p>
                                    )}
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => deleteVisit(visit.id)}>
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[180px]">
                    <MapPin className="w-4 h-4 ml-2" />
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الكل">جميع المدن</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="w-[180px]">
                    <Sparkles className="w-4 h-4 ml-2" />
                    <SelectValue placeholder="نوع الفعالية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الكل">جميع الفعاليات</SelectItem>
                    <SelectItem value="concert">حفلات غنائية</SelectItem>
                    <SelectItem value="theater">مسرحيات</SelectItem>
                    <SelectItem value="fireworks">ألعاب نارية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Events Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="border-emerald-100 dark:border-emerald-800 hover:shadow-lg transition">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className={`${
                          event.type === 'concert' ? 'bg-violet-100 text-violet-700' :
                          event.type === 'theater' ? 'bg-amber-100 text-amber-700' :
                          event.type === 'fireworks' ? 'bg-rose-100 text-rose-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {getEventTypeIcon(event.type)}
                          <span className="mr-1">{getEventTypeLabel(event.type)}</span>
                        </Badge>
                        <span className="text-sm text-gray-500">{event.city}</span>
                      </div>
                      <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
                      <CardDescription>{event.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </span>
                        </div>
                      </div>
                      {event.price && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{event.price}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد فعاليات مطابقة للبحث</p>
                </div>
              )}
            </TabsContent>

            {/* Recipes Tab */}
            <TabsContent value="recipes" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipesData.map((recipe) => (
                  <Dialog key={recipe.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer border-emerald-100 dark:border-emerald-800 hover:shadow-xl transition group overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-emerald-900/30 dark:to-amber-900/30 flex items-center justify-center group-hover:scale-105 transition">
                          <div className="text-6xl">
                            {recipe.id === '1' && '🥮'}
                            {recipe.id === '2' && '🍯'}
                            {recipe.id === '3' && '🍞'}
                            {recipe.id === '4' && '🥧'}
                            {recipe.id === '5' && '🍩'}
                            {recipe.id === '6' && '🍪'}
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{recipe.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">{recipe.region}</Badge>
                          </div>
                          <CardDescription>{recipe.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-3">
                          <span className="text-4xl">
                            {recipe.id === '1' && '🥮'}
                            {recipe.id === '2' && '🍯'}
                            {recipe.id === '3' && '🍞'}
                            {recipe.id === '4' && '🥧'}
                            {recipe.id === '5' && '🍩'}
                            {recipe.id === '6' && '🍪'}
                          </span>
                          {recipe.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <p className="text-gray-600 dark:text-gray-300">{recipe.description}</p>
                        
                        <div>
                          <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
                            <Utensils className="w-5 h-5" />
                            المكونات
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {recipe.ingredients.map((ing, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                {ing}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
                            <ChefHat className="w-5 h-5" />
                            طريقة التحضير
                          </h4>
                          <ol className="space-y-3">
                            {recipe.instructions.map((step, idx) => (
                              <li key={idx} className="flex gap-3 text-sm">
                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center justify-center text-xs font-semibold">
                                  {idx + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Badge className="bg-amber-100 text-amber-700">
                            <MapPin className="w-3 h-3 ml-1" />
                            {recipe.region}
                          </Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
            {/* Nano Banana Prompts Tab */}
            <TabsContent value="prompts" className="space-y-6">
              <NanoBananaPromptsSection />
            </TabsContent>
          </Tabs>
        </main>



        {/* Footer */}
        <footer className="bg-emerald-950 text-emerald-100 py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold">عيدية</h3>
                </div>
                <p className="text-emerald-200 text-sm">
                  منصة العيد السعودي المتكاملة - كل ما تحتاجه لعيد سعيد في مكان واحد
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">روابط سريعة</h4>
                <ul className="space-y-2 text-sm text-emerald-200">
                  <li><button onClick={() => setActiveTab('cards')} className="hover:text-white transition">بطاقات التهنئة</button></li>
                  <li><button onClick={() => setActiveTab('eidiyah')} className="hover:text-white transition">حاسبة العيدية</button></li>
                  <li><button onClick={() => setActiveTab('visits')} className="hover:text-white transition">جدولة الزيارات</button></li>
                  <li><button onClick={() => setActiveTab('events')} className="hover:text-white transition">فعاليات العيد</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">عن المصمم</h4>
                <p className="text-emerald-100 text-sm font-semibold mb-1">عبدالكريم المالكي</p>
                <p className="text-emerald-300 text-xs mb-3">خبير التقنيات التفاعلية والغامرة</p>
                <p className="text-emerald-200 text-xs mb-4 leading-relaxed">
                  صمم هذا الموقع بكل حب وتفانٍ لخدمة المجتمع السعودي في عيد الفطر المبارك، ليجمع بين الأصالة السعودية والتقنيات الحديثة في تجربة تفاعلية فريدة
                </p>
                <a
                  href="https://linkedin.com/in/3bdulkareem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  تواصل على LinkedIn
                </a>
              </div>
            </div>
            <Separator className="my-6 bg-emerald-800" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-emerald-300">
                © 2025 عيدية - منصة العيد السعودي
              </p>
              <p className="text-sm text-emerald-400">
                صمم بإبداع بواسطة <a href="https://linkedin.com/in/3bdulkareem" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">عبدالكريم المالكي</a> 🌙
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
