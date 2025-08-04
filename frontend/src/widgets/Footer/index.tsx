/* eslint-disable @next/next/no-img-element */
import { Container } from "@/shared/helpers/Container";

export default function Footer() {
    return (
        <footer className="bg-[#15A8E3] text-white pt-12 pb-8 mt-20">
            <Container>
                <div className="w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-[85px] h-[70px]">
                                <img alt="logo" src="/images/logo.svg" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-xl font-bold">SigmaMed</h2>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Контакты</h3>
                        <p className="text-sm mb-2">+996 500 288 588</p>
                        <p className="text-sm mb-2">Понедельник - Пятница: 9:00 - 18:00</p>
                        <p className="text-sm mb-2">Суббота: 10:00 - 18:00</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Адрес</h3>
                        <p className="text-sm leading-6">
                            Аптечный склад: Мкрн. 3, д. 3/2<br />
                            ул. Жукеева-Пудовкина, 118А<br />
                        </p>
                    </div>
                </div>
            </Container>

                <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
                    © {new Date().getFullYear()} SigmaMed
                </div>
        </footer>
    );
}
