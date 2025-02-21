import Banner from "../components/Banner";
import Demo from "../components/Demo";


const Home = () => {
    return (
        <div className="text-yellow-500 font-bold text-5xl text-center container w-full mx-auto">
            <Banner></Banner>

            <Demo></Demo>

            This is home
        </div>
    );
};

export default Home;