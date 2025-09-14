import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';

export default function JoinUs() {
  return (
    <div className="flex flex-col md:flex-row md:bg-gray-300 md:rounded-3xl p-6 md:p-8 md:shadow-lg w-full md:w-4/5 mx-auto gap-6 md:gap-12">
      {/* texts */}
      <div className="flex flex-col justify-center text-gray-800 flex-1">
        <h2 className="divider divider-start divider-neutral text-4xl font-bold mb-4 tracking-wide font-sans">Join Us</h2>
        <p className="text-xl font-medium mb-4 text-gray-700">Together in love & God&apos;s word</p>
        <div className="mb-6">
          <div className="flex items-center text-gray-600 mb-2">
            <Clock className="h-5 w-5 mr-2" />
            <span>Join Us Every Sunday At 08.00 AM and 05.00 PM</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>GMIT Imanuel Oepura</span>
          </div>
        </div>
        <button className="btn btn-success btn-wide self-start rounded-full">More Info</button>
      </div>

      {/* image */}
      <div className="flex-shrink-0 rounded-xl overflow-hidden md:w-96 md:h-96 relative flex-1">
        <Image
          src="/header/home.jpg"
          alt="Join Us Event"
          fill
          sizes="(min-width: 768px) 384px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};