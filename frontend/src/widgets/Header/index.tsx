/* eslint-disable @next/next/no-img-element */
'use client';

import { Container } from "@/shared/helpers/Container";
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
import { Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "@/features/Products/model/store";
import { Product } from "@/features/Products/type";

export default function Header() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { products, fetchProducts } = useProductStore();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  useEffect(() => {
    if (query.trim()) {
      const result = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(result.slice(0, 5));
    } else {
      setFiltered([]);
    }
  }, [query, products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const BurgerIcon = ({ open }: { open: boolean }) => (
    <div className="w-6 h-5 relative flex flex-col justify-between items-center">
      <span
        className={`absolute top-0 left-0 h-[3px] w-full bg-[#184363] rounded transition-all duration-300 ease-in-out
          ${open ? 'rotate-45 translate-y-[10px]' : ''}`}
      />
      <span
        className={`absolute top-1/2 left-0 h-[3px] w-full bg-[#184363] rounded transition-all duration-300 ease-in-out
          ${open ? 'opacity-0' : 'translate-y-[-50%]'}`}
      />
      <span
        className={`absolute bottom-0 left-0 h-[3px] w-full bg-[#184363] rounded transition-all duration-300 ease-in-out
          ${open ? '-rotate-45 -translate-y-[10px]' : ''}`}
      />
    </div>
  );   

  return (
    <div className="py-5 md:py-8 border-b fixed top-0 left-0 right-0 z-40 bg-white">
      <Container>
        <div className="flex justify-between items-center">
          <div onClick={() => router.push('/')} className="flex gap-4 items-center cursor-pointer">
            <img width={50} height={50} className="w-[85px] h-auto object-cover flex justify-center items-center" src='/images/logo.svg' alt="logo" />
            <h2 className="text-[rgb(24, 67, 99)] text-2xl font-bold">SigmaMed</h2>
          </div>

          <div className="hidden md:flex w-[63%] h-[50px] relative">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-5 bg-[#ECF4F6] rounded-l-[100px] outline-none"
                type="search"
                placeholder="Найти товар..."
            />
            <div className="bg-[#15A8E3] hover:bg-[#184363] rounded-r-[100px] w-[70px] flex justify-center items-center cursor-pointer">
                <Search className="text-white" />
            </div>

            {query && filtered.length > 0 && (
                <div className="absolute top-[55px] left-0 w-full bg-white shadow-lg rounded-lg z-50 p-4 max-h-[300px] overflow-y-auto">
                <ul className="space-y-2">
                    {filtered.map(product => (
                    <li
                        key={product.id}
                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                        onClick={() => {
                            router.push(`/product/${product.id}`)
                            setQuery("")
                        }}
                    >
                        {product.name}
                    </li>
                    ))}
                </ul>
                <button
                    onClick={() => {
                        router.push(`/catalog`)
                        setQuery("")
                    }}
                    className="mt-4 text-sm text-blue-600 hover:underline"
                >
                    Смотреть все результаты
                </button>
                </div>
            )}
            </div>

          <div className="hidden md:flex gap-4 items-center">
            <WifiCalling3OutlinedIcon sx={{ color: '#15A8E3', fontSize: '27px' }} />
            <div>
              <p className="text-[#184363] font-medium">996-999-88-66-44</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div>
              <Search className="md:hidden" onClick={() => setMobileSearchOpen(true)} />
            </div>

            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              <BurgerIcon open={sidebarOpen} />
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {mobileSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileSearchOpen(false)}
            />

            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed top-0 left-0 right-0 bg-white z-50 p-4 rounded-b-xl shadow-lg"
            >
              <div className="flex">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-l-full bg-[#ECF4F6] outline-none"
                  placeholder="Найти товар..."
                />
                <div
                  className="bg-[#15A8E3] hover:bg-[#184363] rounded-r-full w-[50px] flex justify-center items-center cursor-pointer"
                >
                  <Search className="text-white" />
                </div>
              </div>
              {query && filtered.length > 0 && (
                <div className="mt-2 bg-white rounded p-4 max-h-[300px] overflow-y-auto">
                  <ul>
                    {filtered.map(product => (
                      <li key={product.id} onClick={() => {
                        router.push(`/product/${product.id}`);
                        setQuery("");
                        setMobileSearchOpen(false);
                      }} className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                        {product.name}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      router.push(`/catalog`);
                      setQuery("");
                      setMobileSearchOpen(false);
                    }}
                    className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    Смотреть все результаты
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
        {sidebarOpen && (
            <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 w-3/4 max-w-sm h-screen bg-white shadow-lg z-50 p-6 flex flex-col"
            >
                <nav className="flex flex-col gap-4 mt-6">
                  <div
                      onClick={() => router.push('/')}
                      className="flex gap-4 items-center cursor-pointer"
                  >
                      <img className="w-[70px] h-[60px]" src='/images/logo.svg' alt="logo" />
                      <h2 className="text-[rgb(24, 67, 99)] text-3xl font-bold">SigmaMed</h2>
                  </div>
                  <button
                    onClick={() => {
                      router.push('/catalog')
                      setSidebarOpen(false)
                    }}
                    className="text-left flex items-center text-[#ffffff] bg-[#15A8E3] font-medium text-xl px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#9ce3ff] hover:text-[black] cursor-pointer"
                  >
                    <Menu className="mr-2" />
                    <p>Каталог</p>
                  </button>
                </nav>

                <div className="mt-12 flex items-center gap-3">
                  <WifiCalling3OutlinedIcon sx={{ color: '#15A8E3', fontSize: '27px' }} />
                  <div>
                      <p className="text-[#57718b] text-sm">Поддержка & сервис</p>
                      <p className="text-[#184363] font-medium">986-456-6782</p>
                  </div>
                </div>
            </motion.aside>
            </>
        )}
        </AnimatePresence>
    </div>
  );
}
