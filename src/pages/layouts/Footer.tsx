import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" py-12">
      <div className="container mx-auto px-4 md:text-start text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Produk */}
          <div>
            <h3 className="font-bold text-lg mb-4">PRODUK</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Sepatu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pakaian
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Aksesoris
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Koleksi Terbaru
                </a>
              </li>
            </ul>
          </div>

          {/* Olahraga */}
          <div>
            <h3 className="font-bold text-lg mb-4">OLAHRAGA</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Sepak Bola
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Lari
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gym & Latihan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tenis
                </a>
              </li>
            </ul>
          </div>

          {/* Perusahaan Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">PERUSAHAAN INFO</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pers
                </a>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="font-bold text-lg mb-4">BANTUAN</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Kontak Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pengiriman
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pengembalian
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pembayaran
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-12 flex justify-center space-x-6">
          <a href="#" className="hover:text-gray-400">
            <Facebook size={24} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Twitter size={24} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Instagram size={24} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Youtube size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Nextstore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
