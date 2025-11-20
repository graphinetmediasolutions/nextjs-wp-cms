"use client"
import { TestCarousel } from '@/components/TestCarousel';
import Image from 'next/image'
import React from 'react'

const testimonials = () => {
    const [pause, setPause] = React.useState(false);
    return (
        <>
            {/* <button
                onClick={() => setPause((p) => !p)}
                className="border px-4 py-2 rounded"
            >
                {pause ? "Resume autoplay" : "Pause autoplay"}
            </button> */}

            {/* <TestCarousel pause={pause} /> */}
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <div className="lg:-mx-6 lg:flex lg:items-center">
                        <Image
                            width={1000}
                            height={700}
                            className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
                            src="https://headless.graphinet.co.in/wp-content/uploads/2025/09/close-up-open-prescription-bottle-with-various-pills-spilling-out.webp"
                            alt="testimonial"
                        />
                        {/* <img
                        className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
                        src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt="testimonial"
                    /> */}

                        <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                            <p className="text-5xl font-semibold text-blue-500">“</p>

                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                                Help us improve our productivity
                            </h1>

                            <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
                                “ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
                                quibusdam ducimus libero ad tempora doloribus expedita laborum
                                saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
                                dolorum, obcaecati corrupti aspernatur a. ”
                            </p>

                            <h3 className="mt-6 text-lg font-medium text-blue-500">Mia Brown</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Marketing Manager at Stech
                            </p>

                            <div className="flex items-center justify-between mt-12 lg:justify-start">
                                <button
                                    title="left arrow"
                                    className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>

                                <button
                                    title="right arrow"
                                    className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* lyout 2 */}

            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-6xl px-6 py-10 mx-auto">
                    <p className="text-xl font-medium text-blue-500">Testimonials</p>

                    <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        What clients saying
                    </h1>

                    <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                        <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl" />

                        <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                            {/* Image wrapper for Next/Image with fill */}

                            <Image
                                src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="Client photo"
                                width={400}
                                height={500}
                                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                                sizes="(max-width: 768px) 96px, (max-width: 1024px) 20rem, 26rem"
                                priority
                            />



                            <div className="mt-2 md:mx-6">
                                <div>
                                    <p className="text-xl font-medium tracking-tight text-white">Ema Watson</p>
                                    <p className="text-blue-200">Marketing Manager at Stech</p>
                                </div>

                                <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
                                    libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
                                    assumenda”.
                                </p>

                                <div className="flex items-center justify-between mt-6 md:justify-start">
                                    <button
                                        title="left arrow"
                                        className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <button
                                        title="right arrow"
                                        className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>


            {/* layout 3 */}
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    {/* Heading Section */}
                    <div className="mt-6 md:flex md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                                What our clients are saying
                            </h1>

                            <div className="flex mx-auto mt-6">
                                <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                                <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex justify-between mt-8 md:mt-0">
                            <button
                                title="left arrow"
                                className="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                title="right arrow"
                                className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Testimonials Grid */}
                    <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
                        {/* Card 1 */}
                        <div className="p-8 border rounded-lg dark:border-gray-700">
                            <p className="leading-loose text-gray-500 dark:text-gray-400">
                                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
                                libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
                                assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”
                            </p>

                            <div className="flex items-center mt-8 -mx-2">
                                <div className="relative mx-2 w-14 h-14 shrink-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                        alt="Robert"
                                        fill
                                        className="object-cover rounded-full ring-4 ring-gray-300 dark:ring-gray-700"
                                        sizes="56px"
                                    />
                                </div>
                                <div className="mx-2">
                                    <h1 className="font-semibold text-gray-800 dark:text-white">Robert</h1>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        CTO, Robert Consultency
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 bg-blue-500 border border-transparent rounded-lg dark:bg-blue-600">
                            <p className="leading-loose text-white">
                                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
                                libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
                                assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”
                            </p>

                            <div className="flex items-center mt-8 -mx-2">
                                <div className="relative mx-2 w-14 h-14 shrink-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                                        alt="Jeny Doe"
                                        fill
                                        className="object-cover rounded-full ring-4 ring-blue-200"
                                        sizes="56px"
                                    />
                                </div>
                                <div className="mx-2">
                                    <h1 className="font-semibold text-white">Jeny Doe</h1>
                                    <span className="text-sm text-blue-200">CEO, Jeny Consultency</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 border rounded-lg dark:border-gray-700">
                            <p className="leading-loose text-gray-500 dark:text-gray-400">
                                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
                                libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
                                assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”
                            </p>

                            <div className="flex items-center mt-8 -mx-2">
                                <div className="relative mx-2 w-14 h-14 shrink-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                        alt="Ema Watson"
                                        fill
                                        className="object-cover rounded-full ring-4 ring-gray-300 dark:ring-gray-700"
                                        sizes="56px"
                                    />
                                </div>
                                <div className="mx-2">
                                    <h1 className="font-semibold text-gray-800 dark:text-white">Ema Watson</h1>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Marketing Manager at Stech
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            {/* layut 4 */}

            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
                        What clients saying
                    </h1>

                    <div className="flex justify-center mx-auto mt-6">
                        <span className="inline-block w-40 h-1 bg-blue-500 rounded-full" />
                        <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full" />
                        <span className="inline-block w-1 h-1 bg-blue-500 rounded-full" />
                    </div>

                    <div className="flex items-start max-w-6xl mx-auto mt-16">
                        <button
                            title="left arrow"
                            className="hidden p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:block hover:bg-gray-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div>
                            <p className="flex items-center text-center text-gray-500 lg:mx-8">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quam. Odio voluptatem officiis
                                eos illo! Pariatur, totam alias. Beatae accusamus earum quos obcaecati minima molestias. Possimus
                                minima dolores itaque! Esse! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptates
                                fugiat corrupti laudantium dolores reiciendis pariatur esse quod nihil quia cupiditate debitis
                                quisquam nemo, accusamus animi explicabo? Architecto, unde laboriosam?
                            </p>

                            <div className="flex flex-col items-center justify-center mt-8">
                                <Image
                                    src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    alt="Mia Brown"
                                    width={56}
                                    height={56}
                                    className="object-cover rounded-full w-14 h-14"
                                    priority
                                />

                                <div className="mt-4 text-center">
                                    <h1 className="font-semibold text-gray-800 dark:text-white">Mia Brown</h1>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Marketer</span>
                                </div>
                            </div>
                        </div>

                        <button
                            title="right arrow"
                            className="hidden p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:block hover:bg-gray-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* layout 5 */}
            <section className="my-8 dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
                    <h2 className="p-4 text-4xl font-semibold leading-none text-center">What our customers are saying about us</h2>
                </div>
                <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-violet-600">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus quibusdam, eligendi exercitationem molestias possimus facere.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-violet-600">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
                            <Image
                                src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="Mia Brown"
                                width={56}
                                height={56}
                                className="object-cover rounded-full w-14 h-14"
                                priority
                            />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-violet-600">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus quibusdam, eligendi exercitationem molestias possimus facere.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-violet-600">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
                            <Image
                                src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="Mia Brown"
                                width={56}
                                height={56}
                                className="object-cover rounded-full w-14 h-14"
                                priority
                            />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-violet-600">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus quibusdam, eligendi exercitationem molestias possimus facere.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-violet-600">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
                            <Image
                                src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="Mia Brown"
                                width={56}
                                height={56}
                                className="object-cover rounded-full w-14 h-14"
                                priority
                            />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-violet-600">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus quibusdam, eligendi exercitationem molestias possimus facere.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-violet-600">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
                            <Image
                                src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="Mia Brown"
                                width={56}
                                height={56}
                                className="object-cover rounded-full w-14 h-14"
                                priority
                            />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div>
                </div>
            </section >


            {/* layout 6 */}
            <section>
                <div className="container flex flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
                    <h2 className="p-4 text-4xl font-semibold leading-none text-center">What our customers are saying about us</h2>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <div className="max-w-80 bg-black text-white rounded-2xl">

                            <div className="relative -mt-px overflow-hidden rounded-2xl">


                                <Image
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"
                                    alt=""
                                    className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
                                    width={300}
                                    height={270}
                                />


                                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                            </div>
                            <div className="px-4 pb-4">
                                <p className="font-medium border-b border-gray-600 pb-5 text-white">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                                <p className="mt-4 text-white">— John Doe</p>
                                <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                            </div>
                        </div>
                        <div className="max-w-80 bg-black text-white rounded-2xl">
                            <div className="relative -mt-px overflow-hidden rounded-2xl">


                                <Image
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600"
                                    alt=""
                                    className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
                                    width={300}
                                    height={270}
                                />
                                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                            </div>
                            <div className="px-4 pb-4">
                                <p className="font-medium border-b border-gray-600 pb-5 text-white">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                                <p className="mt-4 text-white" >— John Doe</p>
                                <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                            </div>
                        </div>
                        <div className="max-w-80 bg-black text-white rounded-2xl">
                            <div className="relative -mt-px overflow-hidden rounded-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop"
                                    alt=""
                                    className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
                                    width={300}
                                    height={270}
                                />

                                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                            </div>
                            <div className="px-4 pb-4">
                                <p className="font-medium border-b border-gray-600 pb-5 text-white">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                                <p className="mt-4 text-white">— John Doe</p>
                                <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>

    )
}

export default testimonials
