import React from 'react';
import "./landingPage.css";
import Container from '../../Components/Container';
import heroVed from "../../images/video.mp4";
import uiImg from "../../images/image.png";
import benImg1 from "../../images/ride.png";
import benImg2 from "../../images/reserve_clock.png";
import benImg3 from "../../images/connect.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import { Player, ControlBar } from 'video-react';
function HeroSection() {
    return (
        <div className='hero-section'>
            <div className='hero-text'>
                <h1>Discover Your Next Great Read<br /> at Our <span>Curated Bookstore</span> </h1>
                <p>
                    Explore a World of Stories, Knowledge, and Imagination<br />
                    Dive into a carefully selected collection of books that ignite curiosity
                    and inspire.
                    From timeless classics to hidden gems,
                    find your next literary adventure with us.
                </p>
                {/* <p>
                    Uncover a Universe of Tales, Wisdom, and Creativity<br />
                    Delve into our thoughtfully curated selection of books that spark curiosity
                </p> */}

            </div>
            <video

                src={heroVed}
                controls
            >
            </video>
            {/* <video src={heroVed} controls alt='heroSectionImage' /> */}

        </div>
    );
};

function FeaturesSection() {

    const [text] = useTypewriter({
        words: [
            "Explore a Beautiful Interface",
            "Unmatched Speed",
            "Endless Bookish Delights!"
        ],
        loop: true,
        delaySpeed: 1500,
        typeSpeed: 120,
        deleteSpeed: 50,
    });

    return (
        <div className='features-section'>

            <div className='features-section-img'>
                <img src={uiImg} alt='featuresSectionImg' />
            </div>
            <h1>
                Discover Our Curated Bookstore
                <br />
                <span style={{ color: '#d24542' }}>{text}</span>
                <Cursor />
            </h1>
        </div>
    );
}

export function KeyBenefitsSection() {
    return (
        <div className='key-benefits-section'>
            <div className='benefit'>
                <div>
                    <h3>Digital Catalog</h3>
                    <p>
                        Access thousands of eBooks and audiobooks from a vast
                    </p>
                </div>
                <div>
                    <img alt='' src={benImg1} style={{ width: "130px" }} />
                </div>
            </div>
            <div className='benefit'>
                <div>

                    <h3>Recommendations</h3>
                    <p>
                        Enjoy personalized book recommendations
                    </p>
                </div>
                <div>
                    <img alt='' src={benImg2} style={{ width: "130px" }} />
                </div>
            </div>
            <div className='benefit'>
                <div>

                    <h3>Multi-Device Access</h3>
                    <p>
                        Read or listen to your books anytime, anywhere
                    </p>

                </div>
                <div>
                    <img alt='' src={benImg3} style={{ width: "130px" }} />
                </div>
            </div>
        </div>
    );
}

function LandingPage() {
    return (
        <>
            <Container>
                <Navbar />
                <HeroSection />
                <FeaturesSection />
                <KeyBenefitsSection />
            </Container>
            <Footer />
        </>
    );
}

export default LandingPage;