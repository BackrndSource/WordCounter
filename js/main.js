var $source = $('#source');
var $result = $('#result');
var $mincount = $('#mincount');
var $minlength = $('#minlength');
var $ignore = $('#ignore');
var $ignorecase = $('#ignorecase');
var $fileinput = $('#fileinput');

function count() {
  var wordcounter = new WordCounter({
    report: false,
    mincount: $mincount.val(),
    minlength: $minlength.val(),
    ignore: $ignore.val().replace(/[^a-z0-9\s]/gi, '').split(' '),
    ignorecase: $ignorecase.val() == 'true'
  });

  wordcounter.count($source.val(), function (result, logs) {
    $result.val(logs);
  });
}

function readFile(e) {
  var reader = new FileReader();

  reader.onload = function(e) {
    $source.val(e.target.result).change();
  };

  reader.readAsText(e.target.files[0]);
}

$source.on('keyup change', count);
$mincount.on('change', count);
$minlength.on('change', count);
$ignore.on('change', count);
$ignore.keyup(function(e){if(e.key===' '){count();}});
$ignorecase.on('change', count);
$fileinput.on('change', readFile);

$('.container').on('click', '[data-action]', function (e) {
  switch ($(this).data('action')) {
    case 'reset-source':
      $source.val('');
      $result.val('');
      $fileinput.val('');
      break;

    case 'reset-options':
      $mincount.val(1);
      $minlength.val(1);
      $ignore.val('');
      $ignorecase.val('true');
      count();
      break;
  }
});
