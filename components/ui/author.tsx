import Image from "next/image";

export default function AuthorCard() {
  return (
    <div className="bg-white">
      <h3 className="text-md font-bold text-gray-900 mb-6 tracking-wider">
        Penulis
      </h3>

      <div className="space-y-6">
        {/* Main Author */}
        <div className="flex items-center gap-4">
          <div className="relative aspect-square w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/avatar.png"
              alt="Author avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">
              Galang Saputra
            </h4>
            <p className="text-gray-600 text-sm">
              Content Writer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}