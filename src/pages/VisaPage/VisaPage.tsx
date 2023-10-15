import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SlideInfo from 'src/components/SlideInfo'

import { mainVisa } from 'src/helpers'
import './VisaPage.css'

const VisaPage = () => {
    window.scrollTo({top: 0});
    return (
        <PageTemplate>
            <div className='visaPage'>
                <div className="visaPage__main">
                    <SlideInfo slide={mainVisa} />
                </div>
                <div className="visaPage__wrapper">
                    <div className="visaPage__content">
                        <p className='visaPage__text'>
                            При оплате билетов в кинопространствах mooon и Silver Screen платежными карточками Visa, как в кассах, так и на сайте доступны следующие скидки:
                        </p>
                        <p className='visaPage__text'>
                            VISA GOLD – скидка 5%<br/>
                            VISA PLATINUM - скидка 10%<br/>
                            VISA SIGNATURE - скидка 10%<br/>
                            VISA INFINITE – скидка 15%<br/>
                        </p>
                        <p className='visaPage__text'>
                            Для получения скидки при покупке билетов на сайте, нажмите на одну из скидочных кнопок, которая соответствует вашей карте.
                        </p>
                        <p className='visaPage__text'>
                            Воспользоваться предложением могут держатели всех карт Visa, эмитированных следующими банками Республики Беларусь: ЗАО «Альфа-Банк», ОАО«Белагропромбанк», ОАО «АСБ Беларусбанк», ОАО «Белгазпромбанк», ОАО «БНБ-Банк», ЗAO «БСБ Банк», ЗАО «БТА Банк», ЗАО «Банк «Решение», ЗАО «МТБанк», ОАО «Паритетбанк», ОАО «Приорбанк», ЗАО «РРБ-Банк», ОАО «СтатусБанк», ЗАО «Цептер Банк».
                        </p>
                        <br/><br/>
                        <p className='visaPage__text'>
                            Внимание!
                        </p>
                        <p className='visaPage__text'>
                            При наличии в кинопространствах других акций, скидка предоставляется только по одной акции на выбор покупателя.<br/>
                            Скидки не суммируются с иными скидками, действующими в кинопространствах mooon и Silver Screen.
                        </p>
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}

export default VisaPage
