import React, { useState, useEffect } from 'react'; // Import hooks
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';

// Import the icons we installed
import { FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';

const PortfolioBook = () => {
  // State to hold the dynamic size of a single page
  const [pageSize, setPageSize] = useState({ width: 300, height: 400 });

  // This effect hook runs when the component mounts and on window resize
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      // Define the aspect ratio of your book pages
      const aspectRatio = 3 / 4; // Based on your original 300x400

      // Calculate the new size for mobile
      // We'll make the full book (2 pages) take up 90% of the screen width
      const bookWidth = windowWidth * 0.9;
      const singlePageWidth = bookWidth / 2;

      // Set a max width for desktop to prevent it from getting too large
      const maxPageWidth = 500;
      const newPageWidth = Math.min(singlePageWidth, maxPageWidth);

      setPageSize({
        width: newPageWidth,
        height: newPageWidth / aspectRatio, // Calculate height based on aspect ratio
      });
    };

    // Run on initial load
    handleResize();

    // Add event listener for window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty array ensures this effect runs only once on mount and unmount

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 overflow-hidden">
      <HTMLFlipBook
        width={pageSize.width}
        height={pageSize.height}
        showCover={true}
        // Use the 'size="stretch"' prop to make sure the content fills the page
        size="stretch"
      >
        <Page>
          <div className="bg-blue-500 text-white h-full flex flex-col justify-center items-center p-4">
            <h1 className="text-2xl md:text-4xl font-bold text-center">Portfolio Book</h1>
            <p className="mt-2 md:mt-4 text-center">by Mr. Skeleton</p>
          </div>
        </Page>

        <Page>
          <div className="flex flex-col items-center p-4 text-center">
            <img src="https://i.imgur.com/uWVj3Qv.png" alt="Mr Skeleton" className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-blue-400" />
            <h2 className="text-xl md:text-3xl font-bold mt-4">Mr Skeleton</h2>
            <h3 className="text-md md:text-xl text-gray-600">Web Developer</h3>
            <div className="flex space-x-4 my-4">
              <a href="#" className="text-blue-500 hover:text-blue-700"><FaFacebook size={24} /></a>
              <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-800 hover:text-black"><FaGithub size={24} /></a>
            </div>
          </div>
        </Page>

        <Page>
          <div className="p-4">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Work Experience</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-blue-600 text-sm md:text-base">2018 - 2020</p>
                <h3 className="text-base md:text-lg font-bold">Web Developer - Software Pro</h3>
                <p className="text-gray-600 mt-1 text-xs md:text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae minus eius nemo.</p>
              </div>
            </div>
          </div>
        </Page>
        
        <Page>
            <div className="p-4">
              <h2 className="text-lg md:text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                  <div>
                      <p className="font-semibold text-blue-600 text-sm md:text-base">2016 - 2018</p>
                      <h3 className="text-base md:text-lg font-bold">College</h3>
                      <p className="text-gray-600 mt-1 text-xs md:text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                  </div>
              </div>
            </div>
        </Page>
        
        {/* You should apply similar responsive classes to your other pages (Services, Contact) as well */}

        <Page>
          <div className="bg-blue-500 h-full"></div>
        </Page>
        
        <Page>
          <div className="bg-gray-400 h-full flex justify-center items-center">
            <p className="text-white">The End</p>
          </div>
        </Page>
        
      </HTMLFlipBook>
    </div>
  );
};

export default PortfolioBook;