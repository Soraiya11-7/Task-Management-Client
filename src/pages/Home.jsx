import Banner from "../components/Banner";
// import Demo from "../components/Demo";
import FAQSection from "../components/FAQSection";
import FeaturedSection from "../components/FeaturedSection";
import NewsletterSection from "../components/NewsLetterSection";


const Home = () => {
    return (
        <div className="text-yellow-500 font-bold text-5xl text-center container w-full mx-auto">
            <Banner></Banner>

            <FeaturedSection></FeaturedSection>

            <FAQSection></FAQSection>

            {/* <Demo></Demo>

            This is home */}
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;