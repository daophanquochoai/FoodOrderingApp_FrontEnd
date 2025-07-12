import { bannerProps } from '../../../defaultValue/home/bannerMain';
import { BannerProps } from '../../../type';

let defaultValue = bannerProps;

export const bannerMain = (content: any): BannerProps => ({
    ...defaultValue,
    image: content.image,
    imageHeight: '50.25vw',
    wrapperClass: 'w-screen',
    contentWrapperClass: 'max-w-[55%] xl:gap-5 md:gap-3 gap-2 px-4 sm:px-6 md:px-10 md:pl-20',
    title: {
        text: content.title,
        className: 'font-playball text-yellow-primary text-[clamp(14px,4vw,45px)]',
    },
    layout: content.layout,
    subTitle: {
        text: content.subTitle,
        className: 'font-kanit font-medium text-[clamp(14px,4.5vw,55px)] leading-tight',
    },
    descriptionPrice: {
        text: `${content.descriptionPrice}`,
        className:
            'font-montserrat font-semibold text-yellow-primary text-[clamp(12px,2.3vw,30px)]',
    },
    price: {
        text: `${content.price}`,
        className: 'text-[clamp(14px,3vw,40px)]',
    },
    description: {
        text: content.description,
        className:
            'font-montserrat font-medium text-[clamp(12px,1.4vw,18px)] leading-[1.7] hidden lg:block',
    },
    button: {
        text: content.buttonText,
        className: 'btn-yellow-to-white px-3 py-2 text-[clamp(10px,1vw,18px)]',
        hoverGroup: 'group-hover',
    },
    iconButtonStyleExtra: 'size-4 mb-[2px]',
});
