import React from 'react'

const NotFound: React.FC = () => {
    return (
        <section className='w-screen h-screen flex items-center justify-center text-center'>
            <div className="_container">
                <h1 className="text-[120px] font-medium max-sm:text-[90px]/25">404</h1>
                <p className="mb-3 text-2xl max-w-[600px] italic max-sm:text-xl">Oooops... There is nothing there!</p>
                <p className="max-w-[400px] mb-7">Maybe the page you were looking for is not found or never existed</p>
                <a href="" className="bg-[#e5e5e5] text-[#0a0a0a] p-3 rounded-sm">Get back</a>
            </div>
        </section>
    )
}

export default NotFound