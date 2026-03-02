import { useState } from 'react'
import { Copy, Download, Share2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface PromptTemplate {
  id: string
  title: string
  category: string
  prompt: string
  tips: string[]
}

interface DesignSize {
  id: string
  name: string
  dimensions: string
  aspectRatio: string
  platform: string
}

const designSizes: DesignSize[] = [
  { id: '1', name: 'سناب شات', dimensions: '1080 × 1920', aspectRatio: '9:16', platform: 'Snapchat' },
  { id: '2', name: 'انستقرام - مربع', dimensions: '1080 × 1080', aspectRatio: '1:1', platform: 'Instagram' },
  { id: '3', name: 'انستقرام - ستوري', dimensions: '1080 × 1920', aspectRatio: '9:16', platform: 'Instagram' },
  { id: '4', name: 'تيك توك', dimensions: '1080 × 1920', aspectRatio: '9:16', platform: 'TikTok' },
  { id: '5', name: 'تويتر/إكس', dimensions: '1200 × 675', aspectRatio: '16:9', platform: 'Twitter/X' },
  { id: '6', name: 'فيسبوك', dimensions: '1200 × 628', aspectRatio: '16:9', platform: 'Facebook' },
  { id: '7', name: 'مستطيل أفقي', dimensions: '1600 × 900', aspectRatio: '16:9', platform: 'Custom' },
  { id: '8', name: 'مستطيل عمودي', dimensions: '900 × 1600', aspectRatio: '9:16', platform: 'Custom' }
]

const promptTemplates: PromptTemplate[] = [
  {
    id: '1',
    title: 'بطاقة تهنئة فاخرة',
    category: 'تهنئة',
    prompt: 'صمم بطاقة تهنئة بعيد الفطر فاخرة وأنيقة بألوان ذهبية وأخضر غامق، تتضمن نصاً يقول "كل عام وأنتم بخير" مع زخارف إسلامية جميلة وفانوس رمضاني',
    tips: ['استخدم الألوان الدافئة والذهبية', 'أضف عناصر إسلامية أصيلة', 'اجعل النص واضحاً وقابلاً للقراءة']
  },
  {
    id: '2',
    title: 'تصميم عيد حديث',
    category: 'حديث',
    prompt: 'أنشئ تصميم عيد فطر حديث وجريء باستخدام ألوان نيون (أزرق وبنفسجي ووردي) مع عناصر هندسية معاصرة وأشكال ديناميكية، أضف نصاً يقول "عيد مبارك" بخط عصري',
    tips: ['استخدم الألوان النيون الجريئة', 'أضف حركة وديناميكية', 'اختر خطوط عصرية وحديثة']
  },
  {
    id: '3',
    title: 'تصميم عائلي دافئ',
    category: 'عائلي',
    prompt: 'صمم بطاقة عيد عائلية دافئة تظهر عائلة سعودية سعيدة بملابس تقليدية، مع ألوان دافئة وزخارف نباتية، أضف جملة "عيد مبارك لعائلتنا الكريمة"',
    tips: ['استخدم ألوان دافئة وهادئة', 'أضف عناصر عائلية', 'اجعل الأجواء دافئة وودية']
  },
  {
    id: '4',
    title: 'تصميم ديني ملهم',
    category: 'ديني',
    prompt: 'أنشئ تصميماً إسلامياً ملهماً لعيد الفطر مع آيات قرآنية جميلة، فانوس رمضاني متوهج، وألوان إسلامية تقليدية (أخضر وذهبي وأزرق سماوي)',
    tips: ['استخدم الآيات القرآنية الملهمة', 'أضف عناصر إسلامية أصيلة', 'اختر ألواناً دينية محترمة']
  },
  {
    id: '5',
    title: 'تصميم احتفالي مرح',
    category: 'احتفالي',
    prompt: 'صمم بطاقة احتفالية مرحة لعيد الفطر مع ألعاب نارية وألوان زاهية متعددة، أضف نصاً يقول "عيد سعيد" مع رموز احتفالية وكونفيتي',
    tips: ['استخدم ألواناً زاهية ومرحة', 'أضف عناصر احتفالية', 'اجعل التصميم مليئاً بالفرح والسعادة']
  },
  {
    id: '6',
    title: 'تصميم تقليدي سعودي',
    category: 'تقليدي',
    prompt: 'صمم بطاقة عيد بأسلوب تقليدي سعودي أصيل، استخدم الألوان الخضراء والذهبية مع زخارف هندسية إسلامية، أضف العلم السعودي والنسر',
    tips: ['استخدم الرموز السعودية الأصيلة', 'أضف زخارف هندسية إسلامية', 'احترم التقاليد السعودية']
  },
  {
    id: '7',
    title: 'تصميم فني عالي الجودة',
    category: 'فني',
    prompt: 'أنشئ تصميماً فنياً عالي الجودة لعيد الفطر باستخدام تقنيات فنية متقدمة مع ألوان متناسقة وتكوين احترافي',
    tips: ['استخدم تقنيات فنية متقدمة', 'اختر ألواناً متناسقة', 'اجعل التصميم احترافياً وراقياً']
  },
  {
    id: '8',
    title: 'تصميم للأطفال',
    category: 'أطفال',
    prompt: 'صمم بطاقة عيد فطر جميلة للأطفال مع رسومات كرتونية لطيفة، ألوان زاهية وآمنة، أشكال بسيطة وودية، أضف جملة "عيد مبارك يا أحلى أطفال"',
    tips: ['استخدم رسومات كرتونية لطيفة', 'اختر ألواناً آمنة وزاهية', 'اجعل التصميم بسيطاً وسهل الفهم']
  }
]

export default function PromptTemplatesSection() {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null)
  const [selectedSize, setSelectedSize] = useState<DesignSize>(designSizes[0])
  const [customPrompt, setCustomPrompt] = useState('')

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('تم نسخ البرومبت')
  }

  const sharePrompt = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'برومبت نانو بنانا',
          text: text
        })
      } catch {
        copyPrompt(text)
      }
    } else {
      copyPrompt(text)
    }
  }

  const getFullPrompt = () => {
    let prompt = customPrompt || (selectedPrompt?.prompt || '')
    if (selectedSize) {
      prompt += `\n\nمقاس التصميم: ${selectedSize.name} (${selectedSize.dimensions})`
    }
    return prompt
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
          برومبتات نانو بنانا لعيد الفطر ✨
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          اختر برومبت جاهز أو انسخ النص مباشرة لأداة نانو بنانا
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promptTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer border-2 transition-all ${
              selectedPrompt?.id === template.id
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
            }`}
            onClick={() => {
              setSelectedPrompt(template)
              setCustomPrompt('')
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {template.prompt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Size Selection */}
      <Card className="border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-500" />
            اختر مقاس التصميم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {designSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                  selectedSize.id === size.id
                    ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 font-semibold'
                    : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'
                }`}
              >
                <div className="font-medium">{size.name}</div>
                <div className="text-xs text-gray-500 mt-1">{size.dimensions}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Prompt or Selected Prompt */}
      <Card className="border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            البرومبت النهائي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedPrompt && (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedPrompt.prompt}
                </p>
              </div>
              {selectedPrompt.tips.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-emerald-700 dark:text-emerald-300">
                    نصائح مهمة:
                  </h4>
                  <ul className="space-y-1">
                    {selectedPrompt.tips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Custom Prompt Input */}
          <div className="space-y-2">
            <Label>أو اكتب برومبت مخصص</Label>
            <Textarea
              placeholder="اكتب برومبتك الخاص هنا..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={4}
              className="border-2 focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => copyPrompt(getFullPrompt())}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={!selectedPrompt && !customPrompt}
            >
              <Copy className="w-4 h-4 ml-2" />
              نسخ البرومبت
            </Button>
            <Button
              onClick={() => sharePrompt(getFullPrompt())}
              variant="outline"
              className="flex-1"
              disabled={!selectedPrompt && !customPrompt}
            >
              <Share2 className="w-4 h-4 ml-2" />
              مشاركة
            </Button>
          </div>

          {/* Size Info */}
          {selectedSize && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 text-sm">
              <p className="text-blue-900 dark:text-blue-100">
                مقاس التصميم المختار: <span className="font-semibold">{selectedSize.name}</span> - {selectedSize.dimensions} ({selectedSize.platform})
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
