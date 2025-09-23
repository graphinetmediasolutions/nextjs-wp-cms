import React from 'react'

const BlogThree = () => {
    return (
        <section className="blog-sec pt-16">
            <div className="container">
                <div className="blog-c-sec">
                    <h2 className=" bg-brand sec-main-title mb-5  text-4xl md:text-5xl font-bold leading-snug">
                        Blogs C
                    </h2>
                    <div
                        className="blog-c-card mb-5 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out flex flex-col md:flex-row">

                        <div className="md:w-1/2 relative">
                            <img src="images/admissions.webp" alt="Blog Image"
                                className="w-full h-full object-cover object-center min-h-[250px]" />
                            <span
                                className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                Library
                            </span>
                        </div>

                        <div className="p-6 flex flex-col md:w-1/2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">State-of-the-Art Library</h3>
                            <p className="text-gray-600 line-clamp-4 mb-4">
                                Explore a vast collection of books, research papers, and digital resources in our modern
                                library. Designed to encourage learning, collaboration, and innovation, it offers a perfect
                                environment for students to excel academically.
                            </p>
                            <div className="mt-auto">
                                <a href="#"
                                    className="inline-block bg-orange-600 text-white px-5 py-2 rounded-md font-medium hover:bg-orange-700 transition-colors duration-300">
                                    Know More
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className="blog-c-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out flex flex-col md:flex-row">


                        <div className="md:w-1/2 relative">

                            <img src="images/admissions.webp" alt="Blog Image"
                                className="w-full h-full object-cover object-center min-h-[250px]" />

                            <span
                                className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">

                                Library

                            </span>

                        </div>

                        <div className="p-6 flex flex-col md:w-1/2">

                            <h3 className="text-2xl font-bold text-gray-800 mb-3">State-of-the-Art Library</h3>

                            <p className="text-gray-600 line-clamp-4 mb-4">

                                Explore a vast collection of books, research papers, and digital resources in our modern

                                library. Designed to encourage learning, collaboration, and innovation, it offers a perfect

                                environment for students to excel academically.

                            </p>

                            <div className="mt-auto">

                                <a href="#"
                                    className="inline-block bg-orange-600 text-white px-5 py-2 rounded-md font-medium hover:bg-orange-700 transition-colors duration-300">

                                    Know More

                                </a>

                            </div>

                        </div>



                    </div>



                </div>

            </div>

        </section>
    )
}

export default BlogThree
