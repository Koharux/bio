var titles = [
  "@",
  "@k",
  "@ko",
  "@koh",
  "@koha",
  "@kohar",
  "@koharu",
  "@koharux",
  "@koharux.",
  "@koharux.f"
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
