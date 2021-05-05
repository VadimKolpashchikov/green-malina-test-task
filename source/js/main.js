import '../less/style.less';

const popularGoods = document.querySelector('.goods_popular');
const promotionsGoods = document.querySelector('.goods_promotions');
const pageBody = document.querySelector('.page__body');



const carousel = {
  create(element) {
    const goodsCarousel = element.querySelector('.goods__carousel');
    const buttonRight = element.querySelector('.goods__button_right');
    const buttonLeft = element.querySelector('.goods__button_left');
    const carouselItem = element.querySelectorAll('.carousel-item');

    $(goodsCarousel).slick({
      infinite: false,
      slidesToScroll: 1,
      //centerMode:true,
      slidesToShow: 1,
      variableWidth: true,
      swipe: false,
      arrows: true,
      nextArrow: buttonRight,
      prevArrow: buttonLeft,
    });

    carouselItem.forEach((item) => {
      const elementImgContainer = item.querySelector('.carousel-item__img-carousel');
      const buttonRight = item.querySelector('.carousel-item__img-control_right');
      const buttonLeft = item.querySelector('.carousel-item__img-control_left');

      $(elementImgContainer).slick({
        infinite: false,
        arrows: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        focusOnSelect: true,
        centerMode:true,
        centerPadding: '0',
        swipe: false,
        nextArrow: buttonRight,
        prevArrow: buttonLeft,
      });
    });

    this.makeWidth(goodsCarousel)
  },

  changeToMobileOptions(element) {
    $(element).slick('slickSetOption', 'swipe', true);
  },

  changeToDesktopOptions(element) {
    $(element).slick('slickSetOption', 'swipe', false);
  },

  makeWidth(element) {
    const carouselWindow = element.querySelector('.slick-list');

    const resizeCarouselWindow = (carouselWindow) => {
      if (pageBody.offsetWidth >= 1920) {
        carouselWindow.style.width = 1845 + 'px';
      } else
        if (pageBody.offsetWidth >= 1440) {
        carouselWindow.style.width = pageBody.offsetWidth - 75 + 'px';
      } else if (pageBody.offsetWidth >= 1200) {
        carouselWindow.style.width = pageBody.offsetWidth - 20 + 'px';
      } else if (pageBody.offsetWidth < 1200) {
        carouselWindow.style.width = pageBody.offsetWidth + 'px';
      }
    }

    const disableLink = (element) => {
      const links = element.querySelectorAll('a');

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

    if (pageBody.offsetWidth < 1200) {
      this.changeToMobileOptions(element);
    } else {
      this.changeToDesktopOptions(element);
    }

    window.addEventListener(`resize`, () => {
      resizeCarouselWindow(carouselWindow);
      if (pageBody.offsetWidth < 1200) {
        this.changeToMobileOptions(element);
      } else {
        this.changeToDesktopOptions(element);
      }
    })
  },
}







carousel.create(popularGoods);
carousel.create(promotionsGoods);




