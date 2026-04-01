
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  ArrowLeft, 
  Zap, 
  Smartphone, 
  Store, 
  Utensils, 
  Car, 
  Home as HomeIcon, 
  PartyPopper, 
  Wrench, 
  ShieldCheck,
  Clock,
  MapPin,
  ChevronLeft,
  CheckCircle2,
  Download,
  ArrowUpRight,
  TrendingUp,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_ITEMS } from '@/lib/data';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview الصفحة الرئيسية الإبداعية لتطبيق Tatx.
 * تعتمد على تدرجات لونية متطورة، لغة تصميم MD3، وتفاعلات بصرية غنية.
 */
export default function Home() {
  const router = useRouter();

  const services = [
    { name: 'سوبر ماركت', icon: Store, desc: 'تسوق ذكي، توصيل فوري بضمان تاتكس', color: 'bg-blue-500/10 text-blue-600', border: 'border-blue-100' },
    { name: 'أشهى المطاعم', icon: Utensils, desc: 'أطباق عالمية ومحلية تصلك ساخنة', color: 'bg-orange-500/10 text-orange-600', border: 'border-orange-100' },
    { name: 'تاكسي Tatx', icon: Car, desc: 'مشاوير VIP، أمان تام، كباتن محترفون', color: 'bg-emerald-500/10 text-emerald-600', border: 'border-emerald-100' },
    { name: 'شاليهات فاخرة', icon: HomeIcon, desc: 'خصوصية واستجمام في أجمل المنتجعات', color: 'bg-purple-500/10 text-purple-600', border: 'border-purple-100' },
    { name: 'قاعات مناسبات', icon: PartyPopper, desc: 'نظم مناسبتك القادمة بكل احترافية', color: 'bg-pink-500/10 text-pink-600', border: 'border-pink-100' },
    { name: 'خدمات منزلية', icon: Wrench, desc: 'صيانة فورية، فنيون خبراء تحت طلبك', color: 'bg-amber-500/10 text-amber-600', border: 'border-amber-100' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white overflow-hidden">
        
        {/* --- SECTION 1: CREATIVE HERO --- */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-48">
          {/* Creative Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 -ml-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              {/* Content Side */}
              <div className="text-right space-y-10 order-1 lg:order-1">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-primary/10 shadow-sm transition-transform hover:scale-105">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-sm font-black text-primary">تاتكس يحلها لك بضغطة واحدة</span>
                </div>
                
                <h1 className="text-6xl md:text-[6.5rem] font-black leading-[0.95] tracking-tighter text-foreground">
                  أسلوب حياة<br />
                  <span className="relative inline-block mt-4">
                    <span className="relative z-10 text-primary">أكثر ذكاءً</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-4 text-primary/20 -z-0" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
                      <path d="M5 15C50 15 100 5 150 5C200 5 250 15 295 15" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
                
                <p className="text-2xl md:text-3xl text-muted-foreground font-bold leading-relaxed max-w-xl mr-0 ml-auto opacity-80">
                  انضم لأكثر من 100 ألف مستخدم يعتمدون على Tatx يومياً في طلباتهم، مشاويرهم، وخدماتهم المنزلية.
                </p>

                <div className="flex flex-wrap gap-6 justify-end pt-4">
                  <Button className="h-[80px] px-10 rounded-[2.5rem] bg-black text-white gap-5 shadow-2xl hover:bg-black/90 transition-all hover:translate-y-[-4px] active:scale-95 border-none">
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[11px] opacity-60 mb-1">Download on the</span>
                      <span className="text-2xl font-black">App Store</span>
                    </div>
                    <Smartphone className="w-9 h-9" />
                  </Button>
                  <Button className="h-[80px] px-10 rounded-[2.5rem] bg-primary text-white gap-5 shadow-2xl hover:bg-primary/90 transition-all hover:translate-y-[-4px] active:scale-95 border-none">
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[11px] opacity-80 mb-1">GET IT ON</span>
                      <span className="text-2xl font-black">Google Play</span>
                    </div>
                    <div className="w-9 h-9 flex items-center justify-center">
                      <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                      </svg>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Visual Side */}
              <div className="relative order-2 lg:order-2">
                <div className="relative z-10 mx-auto w-full max-w-[420px]">
                  {/* Floating Elements */}
                  <div className="absolute -right-12 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-white/20 flex items-center gap-4 z-20">
                    <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-base">طلبك وصل!</span>
                      <span className="text-xs text-muted-foreground font-bold">بأقل من 15 دقيقة</span>
                    </div>
                  </div>

                  <div className="absolute -left-10 bottom-20 bg-black text-white p-5 rounded-[2rem] shadow-2xl border border-white/10 flex items-center gap-4 z-20">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-base">وفرت 25%</span>
                      <span className="text-xs opacity-60 font-bold">بإستخدام كود TATX</span>
                    </div>
                  </div>

                  {/* Smartphone Frame */}
                  <div className="relative aspect-[9/18.5] bg-[#0A0A0A] rounded-[4.5rem] p-4 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.4)] border-[14px] border-[#1A1C1E] overflow-hidden group rotate-3 hover:rotate-0 transition-transform duration-700">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1A1C1E] rounded-b-3xl z-30" />
                    <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden bg-white">
                      <Image 
                        src="https://picsum.photos/seed/tatx-creative-ui/800/1600" 
                        alt="Tatx Mobile UI" 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Decorative Background for Image */}
                <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full scale-125 -z-10" />
              </div>

            </div>
          </div>
        </section>

        {/* --- SECTION 2: SERVICES - BENTO STYLE --- */}
        <section className="py-32 bg-[#FBFBFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight">عالم من الخدمات <span className="text-primary">بين يديك</span></h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-bold leading-relaxed">
                لا داعي لامتلاك عشرات التطبيقات، Tatx يجمع لك كل ما تحتاجه في تجربة واحدة سلسة وسريعة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((ser, i) => (
                <div key={i} className={`group relative bg-white p-12 rounded-[4rem] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:translate-y-[-12px] text-right border ${ser.border}`}>
                  <div className={`w-24 h-24 ${ser.color} rounded-[2.5rem] flex items-center justify-center mb-10 mr-0 ml-auto shadow-sm group-hover:scale-110 transition-all duration-500 group-hover:rotate-6`}>
                    <ser.icon className="w-12 h-12" />
                  </div>
                  <h4 className="text-3xl font-black mb-4 text-foreground group-hover:text-primary transition-colors">{ser.name}</h4>
                  <p className="text-xl text-muted-foreground font-bold leading-relaxed mb-10 opacity-80">
                    {ser.desc}. جودة استثنائية وسرعة في التنفيذ بضمان Tatx المباشر.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto font-black text-primary gap-3 hover:bg-transparent shadow-none group-hover:translate-x-[-10px] transition-transform text-xl">
                    <span>استكشف المزايا</span>
                    <ArrowLeft className="w-7 h-7" />
                  </Button>
                  
                  {/* Decorative corner element */}
                  <div className="absolute top-10 left-10 opacity-0 group-hover:opacity-10 transition-opacity">
                    <ser.icon className="w-20 h-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: PREMIUM TAXI BANNER --- */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="bg-[#0D0D0D] rounded-[5rem] p-16 md:p-32 overflow-hidden relative group">
              {/* Glowing Backgrounds */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-0 opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-0" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                <div className="order-2 lg:order-1 flex justify-center">
                  <div className="relative w-full max-w-[500px] aspect-[16/10] rounded-[3.5rem] overflow-hidden border-[16px] border-white/5 shadow-2xl group-hover:scale-105 transition-transform duration-1000 group-hover:rotate-1">
                    <Image src="https://picsum.photos/seed/tatx-premium-taxi/1000/600" alt="Tatx VIP Taxi" fill className="object-cover brightness-75 transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                        <Car className="w-12 h-12" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-white text-right order-1 lg:order-2 space-y-10">
                  <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                    مشاويرك<br /><span className="text-primary">بمعايير VIP</span>
                  </h2>
                  <p className="text-2xl md:text-3xl text-white/70 font-bold leading-relaxed">
                    اطلب سيارتك الآن واستمتع برحلة هادئة، سيارات حديثة، وكباتن هم الأفضل في المملكة. تتبع رحلتك لحظة بلحظة وادفع بكل سهولة.
                  </p>
                  <div className="flex flex-wrap gap-5 justify-end">
                    {['كباتن معتمدون', 'تتبع حي', 'أفضل الأسعار', 'دعم 24/7'].map((tag, idx) => (
                      <Badge key={idx} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black px-8 py-4 text-sm rounded-[1.5rem] shadow-none backdrop-blur-md transition-colors cursor-default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={() => router.push('/taxi')} className="mt-10 h-[90px] px-20 rounded-[2.5rem] bg-primary text-white hover:bg-primary/90 font-black text-3xl shadow-[0_20px_50px_-10px_rgba(239,68,68,0.5)] transition-all hover:translate-y-[-6px] active:scale-95 border-none">
                    احجز رحلتك الأولى
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: APP SHOWCASE - SCROLL SLIDER --- */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10 text-right">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">بساطة التصميم، <span className="text-primary">قوة الأداء</span></h2>
                <p className="text-2xl text-muted-foreground font-bold opacity-70">واجهات مصممة بعناية لتوفر لك أسرع تجربة مستخدم في المملكة.</p>
              </div>
              <div className="flex gap-5">
                <Button variant="outline" size="icon" className="rounded-full h-20 w-20 border-2 border-border/50 hover:bg-secondary transition-all shadow-sm"><ArrowLeft className="w-10 h-10 rotate-180" /></Button>
                <Button variant="outline" size="icon" className="rounded-full h-20 w-20 border-2 bg-primary text-white border-primary shadow-xl hover:bg-primary/90 transition-all hover:scale-110"><ArrowLeft className="w-10 h-10" /></Button>
              </div>
            </div>

            <div className="flex gap-12 overflow-x-auto no-scrollbar pb-20 -mx-4 px-4 mask-fade-edges">
              {[
                { title: 'سوبر ماركت ذكي', img: 'https://picsum.photos/seed/screen-market/600/1200', hint: 'أكثر من 5000 منتج بلمسة واحدة' },
                { title: 'تتبع الرحلات', img: 'https://picsum.photos/seed/screen-taxi/600/1200', hint: 'راقب كابتن تاتكس مباشرة' },
                { title: 'حجز فوري للشاليهات', img: 'https://picsum.photos/seed/screen-chalet/600/1200', hint: 'صور حقيقية وضمان تاتكس' },
                { title: 'إدارة طلباتك', img: 'https://picsum.photos/seed/screen-orders/600/1200', hint: 'كل خدماتك في مكان واحد' }
              ].map((screen, idx) => (
                <div key={idx} className="min-w-[320px] md:min-w-[420px] group cursor-pointer space-y-10">
                  <div className="relative aspect-[9/18.5] rounded-[4.5rem] overflow-hidden border-[12px] border-[#F8F9FA] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:scale-[1.03] group-hover:shadow-[0_60px_130px_-30px_rgba(0,0,0,0.15)] group-hover:rotate-1">
                    <Image src={screen.img} alt={screen.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-right px-6 space-y-2">
                    <h4 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">{screen.title}</h4>
                    <p className="text-lg text-muted-foreground font-bold">{screen.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: SOCIAL PROOF - MODERN CARDS --- */}
        <section className="py-32 bg-[#F8F9FA]">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-7xl font-black mb-24 text-center text-foreground tracking-tight">كلمات من <span className="text-primary">عائلة Tatx</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                { name: 'أحمد القحطاني', role: 'عميل ذهبي', text: 'Tatx غير روتيني اليومي، سرعة التوصيل خيالية والتطبيق سهل جداً، أصبح رفيقي في كل مشوار وطلب.', rating: 5 },
                { name: 'سارة العتيبي', role: 'ربة منزل', text: 'أفضل ميزة هي حجز الشاليهات، الصور مطابقة للواقع تماماً والخدمة احترافية، شكراً لفريق تاتكس المبدع.', rating: 5 },
                { name: 'خالد محمد', role: 'كابتن تاتكس', text: 'فخور كوني جزء من فريق كباتن تاتكس، نظام العمل مرن والدعم مستمر دائماً لتحسين دخلنا وتطوير مهاراتنا.', rating: 5 }
              ].map((test, i) => (
                <Card key={i} className="p-14 rounded-[4.5rem] border-none shadow-sm bg-white text-right relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:translate-y-[-10px]">
                  <div className="flex items-center gap-6 justify-end mb-10">
                    <div className="text-right">
                      <h4 className="font-black text-2xl text-foreground">{test.name}</h4>
                      <p className="text-sm font-bold text-primary">{test.role}</p>
                    </div>
                    <div className="relative w-24 h-24 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-500">
                      <Image src={`https://picsum.photos/seed/user-${i}/300/300`} alt={test.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-1 mb-6">
                    {[...Array(test.rating)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-2xl font-bold text-muted-foreground leading-relaxed italic opacity-90">"{test.text}"</p>
                  
                  <div className="absolute top-10 left-10 text-primary/5">
                    <svg className="w-32 h-32 fill-current" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.91241 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H3.01697C2.46468 8 2.01697 7.55228 2.01697 7V5C2.01697 4.44772 2.46468 4 3.01697 4H7.01697C8.67382 4 10.017 5.34315 10.017 7V15C10.017 18.3137 7.33068 21 4.01697 21H2.01697Z"/></svg>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 6: THE FINAL CTA - EXPLOSIVE DESIGN --- */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[6rem] p-20 md:p-40 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(239,68,68,0.3)]">
              {/* Animated Background Details */}
              <div className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110">
                <Image src="https://picsum.photos/seed/tatx-global-impact/1600/800" alt="Tatx World" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
              
              <div className="relative z-10 max-w-5xl mx-auto space-y-16">
                <h2 className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter">
                  ابدأ رحلتك<br />مع <span className="underline decoration-white/20 underline-offset-[20px]">Tatx الآن</span>
                </h2>
                <p className="text-3xl md:text-4xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed opacity-90">
                  انضم إلى عالم من الرفاهية والسهولة. حمل التطبيق الأروع في المملكة مجاناً اليوم.
                </p>
                <div className="flex flex-wrap gap-10 justify-center pt-10">
                  <Button className="h-[100px] px-20 rounded-[3rem] bg-white text-primary hover:bg-white/95 font-black text-3xl shadow-2xl hover:scale-110 transition-all border-none gap-6 group">
                    <Download className="w-10 h-10 group-hover:animate-bounce" />
                    تحميل التطبيق مجاناً
                  </Button>
                </div>
                
                <div className="flex justify-center gap-12 text-white/60 font-black text-sm tracking-widest pt-10">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> حماية تاتكس</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> دعم فني مباشر</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> أفضل جودة</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
