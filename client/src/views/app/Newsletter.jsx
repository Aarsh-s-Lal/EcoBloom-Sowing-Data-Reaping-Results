export default () => {
    return (
        <section id="Newsletters" className="py-28 relative">

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 justify-between items-center gap-12 md:px-8 md:flex">
                <div className="flex-1 max-w-lg">
                    <h3 className="text-3xl font-bold">
                        Get our beautiful newsletter straight to your inbox.
                    </h3>
                </div>
                <div className="flex-1 mt-6 md:mt-0">
                    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-x-3 md:justify-end">
                        <div className="relative">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-gray-600 hover:bg-gray-500 active:bg-gray-700 active:shadow-none rounded-lg shadow">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="absolute blur-xl inset-0 w-full h-full" style={{ background: "linear-gradient(137.92deg, rgba(192, 132, 252, 0) 20.43%, rgba(0, 128, 128, 0.17) 49.66%, rgba(204, 171, 238, 0) 92.38%)" }}></div>
        </section>
    )
}