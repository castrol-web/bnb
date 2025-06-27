import AboutSection from "../about/AboutSection";
import MainHeader from "../components/MainHeader"
import Search from "../components/Search";
import { TestimonialCarousel } from "../components/testimonial/TestimonialCarousel";

function Home() {
    return (
        <div className="items-center justify-center">
            <MainHeader />
            <Search />
            <AboutSection />
            <TestimonialCarousel />
        </div>
    )
}

export default Home