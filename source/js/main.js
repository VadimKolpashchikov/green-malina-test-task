import '../less/style.less';

const DESKTOP_SLIDES_SHOWN = 5;

const popularGoods = document.querySelector('.goods_popular');
const promotionsGoods = document.querySelector('.goods_promotions');
const pageBody = document.querySelector('.page__body');


const carousel = {
  create(element) {
    const goodsCarousel = element.querySelector('.goods__carousel');
    const buttonRight = element.querySelector('.goods__button_right');
    const buttonLeft = element.querySelector('.goods__button_left');
    const carouselItem = element.querySelectorAll('.carousel-item');
    const itemsLength = carouselItem.length;

    const blockButton = (currentSlide) => {
      if (currentSlide <= 0) {
        buttonLeft.classList.add('goods__button_disabled');
        buttonRight.classList.remove('goods__button_disabled');
      } else if (DESKTOP_SLIDES_SHOWN + currentSlide >= itemsLength) {
        buttonRight.classList.add('goods__button_disabled');
        buttonLeft.classList.remove('goods__button_disabled');
      } else {
        buttonLeft.classList.remove('goods__button_disabled');
        buttonRight.classList.remove('goods__button_disabled');
      }
    }

    buttonLeft.addEventListener('click', () => {
     const currentSlide = $(goodsCarousel).slick('slickCurrentSlide') - 1;
      blockButton(currentSlide);
    });

    buttonRight.addEventListener('click', () => {
      const currentSlide = $(goodsCarousel).slick('slickCurrentSlide') + 1;
      blockButton(currentSlide);
    });

    $(goodsCarousel).slick({
      infinite: false,
      slidesToScroll: 1,
      slidesToShow: 2,
      variableWidth: false,
      swipe: false,
      arrows: true,
      nextArrow: buttonRight,
      prevArrow: buttonLeft,
    });

    carouselItem.forEach((item) => {
      const elementImgContainer = item.querySelector('.carousel-item__img-carousel');
      const imgItemsLength = elementImgContainer.querySelectorAll('.carousel-item__img-container').length - 1;

      const blockImgButton = () => {
        const currentSlide = $(elementImgContainer).slick('slickCurrentSlide');
        if (currentSlide <= 0) {
          imgButtonLeft.classList.add('carousel-item__img-control_disabled');
          imgButtonRight.classList.remove('carousel-item__img-control_disabled');
        } else if (currentSlide >= imgItemsLength) {
          imgButtonRight.classList.add('carousel-item__img-control_disabled');
          imgButtonLeft.classList.remove('carousel-item__img-control_disabled');
        } else {
          imgButtonLeft.classList.remove('carousel-item__img-control_disabled');
          imgButtonRight.classList.remove('carousel-item__img-control_disabled');
        }
      };

      $(elementImgContainer).slick({
        infinite: false,
        arrows: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        focusOnSelect: true,
        centerMode:true,
        centerPadding: '0',
        swipe: false,
        nextArrow: '<button class="carousel-item__img-control carousel-item__img-control_right" type="button">\n' +
          '                <svg xmlns="http://www.w3.org/2000/svg" width="7px" height="9px" viewBox="0 0 240 310"><path d="M94.35 0l-35.7 35.7L175.95 153 58.65 270.3l35.7 35.7 153-153z"/></svg>\n' +
          '              </button>',
        prevArrow: '<button class="carousel-item__img-control carousel-item__img-control_left carousel-item__img-control_disabled" type="button">\n' +
          '                <svg xmlns="http://www.w3.org/2000/svg" width="7px" height="9px" viewBox="0 0 240 310"><path d="M94.35 0l-35.7 35.7L175.95 153 58.65 270.3l35.7 35.7 153-153z"/></svg>\n' +
          '              </button>',
      });

      const imgButtonLeft = elementImgContainer.querySelector('.carousel-item__img-control_left');
      const imgButtonRight = elementImgContainer.querySelector('.carousel-item__img-control_right');

      imgButtonLeft.addEventListener('click', blockImgButton);
      imgButtonRight.addEventListener('click', blockImgButton);
    });

    this.makeWidth(goodsCarousel)
  },

  changeToMobileOptions(element) {
    $(element).slick('slickSetOption', 'swipe', true);
    $(element).slick('slickSetOption', 'slidesToShow', 2);
  },

  changeToTableOptions(element) {
    $(element).slick('slickSetOption', 'swipe', true);
    $(element).slick('slickSetOption', 'slidesToShow', 3);
  },

  changeToDesktopOptions(element) {
    $(element).slick('slickSetOption', 'swipe', false);
    $(element).slick('slickSetOption', 'slidesToShow', DESKTOP_SLIDES_SHOWN);
  },

  makeWidth(element) {
    const carouselWindow = element.querySelector('.slick-list');

    const resizeCarouselWindow = (carouselWindow) => {
      if (pageBody.offsetWidth >= 1920) {
        carouselWindow.style.width = 1920 + 'px';
      } else if (pageBody.offsetWidth < 1920) {
        carouselWindow.style.width = pageBody.offsetWidth + 'px';
      }
    }

    const disableLink = (element) => {
      const links = element.querySelectorAll('.carousel-item__link');

      const doNotFollowLink = (evt) => {
        if (pageBody.offsetWidth >= 1200) {
          evt.preventDefault();
        }
      }

      links.forEach((link) => {
        link.addEventListener('click', doNotFollowLink)
      })
    }

    resizeCarouselWindow(carouselWindow)
    disableLink(element)

    if (pageBody.offsetWidth < 768) {
      this.changeToMobileOptions(element);
    } else if (pageBody.offsetWidth < 1200) {
      this.changeToTableOptions(element);
    } else {
      this.changeToDesktopOptions(element);
    }

    window.addEventListener(`resize`, () => {
      resizeCarouselWindow(carouselWindow);
      if (pageBody.offsetWidth < 768) {
        this.changeToMobileOptions(element);
      } else if (pageBody.offsetWidth < 1200) {
        this.changeToTableOptions(element);
      } else {
        this.changeToDesktopOptions(element);
      }
    })
  },
}


carousel.create(popularGoods);
carousel.create(promotionsGoods);