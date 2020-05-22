const gallery = $(".gallery-container");
setTimeout(() => {
  gallery.find('.gallery-init').removeClass('gallery-init');
}, 200);
gallery.find("li").on("click", function () {
  $(this).addClass("active");
  gallery.find("ul").addClass("active");
});
gallery.find(".gallery-close").on("click", e => {
  e.stopPropagation();
  gallery.find(".active").removeClass("active");
});