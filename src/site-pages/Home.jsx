import Hero from '../design-system/Hero';
import TrustBar from '../design-system/TrustBar';
import StatsBar from '../design-system/StatsBar';
import ServicesGrid from '../design-system/ServicesGrid';
import WhyUs from '../design-system/WhyUs';
import ProcessSteps from '../design-system/ProcessSteps';
import HomeGuidance from '../design-system/HomeGuidance';
import TestimonialSlider from '../design-system/TestimonialSlider';
import FAQAccordion from '../design-system/FAQAccordion';
import CTABanner from '../design-system/CTABanner';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <TrustBar />
      <StatsBar />
      <ServicesGrid />
      <WhyUs />
      <ProcessSteps />
      <HomeGuidance />
      <TestimonialSlider />
      <FAQAccordion />
      <CTABanner />
    </main>
  );
}
