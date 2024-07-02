import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { AiFillAmazonCircle, AiFillAmazonSquare } from 'react-icons/ai';

export default function Footer() {
  return (
<footer className="absolute bottom-0 left-0 w-full md:relative md:bottom-auto md:mt-4 bg-pink-200/80 text-white py-4 w-1/2 md:w-40% mx-auto flex justify-center items-center rounded-xl">
      <div className="flex space-x-6">
        <a
          href="https://www.instagram.com/jackiesbooktally"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.tiktok.com/@jackiesbooktally"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <FaTiktok size={24} />
        </a>
        <a
          href="https://www.amazon.com/shop/jackiesbooktally"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <AiFillAmazonCircle size={24} />
        </a>
        <a
          href="https://www.amazon.com/hz/wishlist/ls/VWKBGAE6Y4L7?ref_=wl_share"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <AiFillAmazonSquare size={24} />
        </a>
      </div>
    </footer>
  );
}
