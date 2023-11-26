import Link from "next/link"

export default function Navbar() {

    return (
        <nav className="flex flex-row justify-between p-6">
            <div >
                {/* logo */}
                <Link href="/">Press Pulse</Link>
            </div>
            <div>
                {/* links */}
                <ul className="flex flex-row gap-4">
                    <li><Link href="/news-this-week">NEWS THIS WEEK</Link></li>
                    <li><Link href="/our-story">OUR STORY</Link></li>
                    <li><Link href="/vote">VOTE</Link></li>
                    {/* <li>SHOP</li> */}
                    <li><Link href="/contact">CONTACT</Link></li>
                </ul>
            </div>
            <div>
                <form>
                    <input className="text-center" type="text" placeholder="Search" />
                </form>
            </div>
        </nav>
    )
}