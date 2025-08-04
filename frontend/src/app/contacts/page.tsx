import { Container } from "@/shared/helpers/Container";

export default function ContactsPage() {
    return (
        <div className="mt-8 text-[#184363]">
            <Container>
                <h1 className="text-3xl font-semibold mb-6">Контакты</h1>
                <p className="mb-4">
                    Главным в деятельности Компании являются поставки медицинской техники и медицинских изделий от мировых производителей. 
                    Таможенные и транспортные расходы мы берем на себя, что гарантирует Клиентам низкую закупочную себестоимость.
                </p>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Адрес:</h2>
                    <p>Кыргызская Республика, г. Бишкек, ул. Жукеева-Пудовкина 118А</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Контакты</h2>
                    <p>Номера: <a href="tel:+77172280874" className="text-[#15A8E3] hover:underline">996 500 288 588, +996 500 133 131, +996 500 122 422</a></p>
                    <p>Email: <a href="mailto:mdtech11@mail.ru" className="text-[#15A8E3] hover:underline">sigmamedtrade@mail.ru</a></p>
                </div>

                {/* <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Реквизиты</h2>
                    <p>ТОО «МD Tech»</p>
                    <p>Республика Казахстан, г. Астана, ул. Коргалжинское шоссе, д.13/7</p>
                    <p>АО «Народный Банк Казахстана»</p>
                    <p>БИН: 110640022272</p>
                    <p>БИК: HSBKKZKX</p>
                    <p>Счет № KZ246010191000197779 (KZT)</p>
                    <p>НДС серия 62001 № 0024910 от 14.12.2012г.</p>
                    <p>Директор: Ким Олег Арсеньевич</p>
                </div> */}
            </Container>
        </div>
    );
}
