import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex justify-between p-3 px-4 bg-gray-200">
            <div className="flex gap-4 items-center px-2">
                <h1 className="font-bold text-2xl">
                    <span className="text-red-700">Day</span>
                    <span className="">To</span>
                    <span className="text-blue-700">Day</span>
                </h1>
                <Link href="/" className="font-bold">Home</Link>
            </div>
            <div className="flex gap-4 items-center px-2">
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </div>
        </div>
    )
}

export default Navbar;