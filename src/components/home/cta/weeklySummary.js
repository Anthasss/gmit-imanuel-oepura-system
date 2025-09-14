import Image from "next/image";

export default function WeeklySummary() {
  return (
    <div className="flex flex-col md:flex-row md:bg-gray-300 md:rounded-3xl p-6 md:p-8 shadow-lg w-full md:w-4/5 mx-auto gap-6 md:gap-12">
      {/* image */}
      <div className="flex-shrink-0 rounded-xl overflow-hidden md:w-96 md:h-96 relative flex-1">
        <Image
          src="/header/home.jpg"
          alt="Three black crosses in silhouette on grass with dramatic greenish cloudy sky background, sun rays breaking through the clouds"
          fill
          sizes="(min-width: 768px) 384px, 100vw"
          className="object-cover"
        />
      </div>

      {/* texts */}
      <div className="flex flex-1 flex-col justify-center text-gray-800">
        <h2 className="divider divider-start divider-neutral text-4xl font-bold mb-4 tracking-wide font-sans">Weekly Summary</h2>
        <h3 className="text-xl font-medium mb-4 text-gray-700">Theme Goes Here</h3>
        <p className="text-gray-600 mb-6 max-w-prose leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum est et nisi pretium ornare. Fusce at convallis nisl, sit amet congue nunc. Sed et nisl nec risus gravida volutpat ac ac nulla.
        </p>
        <p className="mb-8 italic font-semibold text-gray-700">— Mattew 3 : 2</p>
        <button className="btn btn-success btn-wide self-start rounded-full">
          More Info
        </button>
      </div>
    </div>
  );
}

