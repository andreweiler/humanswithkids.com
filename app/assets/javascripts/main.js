/*
 * jQuery File Upload Plugin JS Example 6.5.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$(function () {

    function update(coords)
    {
      $('#picture_crop_x').val(coords.x)
      $('#picture_crop_y').val(coords.y)
      $('#picture_crop_w').val(coords.w)
      $('#picture_crop_h').val(coords.h)
    };

    $('#cropbox').Jcrop({
      boxWidth: 770,
      boxHeight: 433,
      onSelect: update,
      onChange: update
    });


    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
      autoUpload: true,
      prependFiles: true,

      uploadTemplate: function (o) {
        var rows = $();
        var row;
        $.each(o.files, function (index, file) {
          console.log("Upload This File");
          console.log(file);

            row = $('<div class="col-md-4">' +
                          '<div class="thumbnail" style="border: none;">' +
                            '<div class="preview" style="text-align: center;"></div>' +
                            '<div class="progress">' +
                              '<div class="progress-bar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" role="progressbar" style="width: 0%;">' +
                                '<span class="sr-only">0% Complete</span>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>');


// <div class="progress">
//   <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
//     <span class="sr-only">60% Complete</span>
//   </div>
// </div>


            rows = rows.add(row);

        });
        // return rows;
        return row;
    },

    completed: function(e, data) {
      console.log("It is finished uploading");
      console.log(data.result[0].url);
      $('a[href^="' + data.result[0].url + '"]').slimbox();
    },

    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      console.log("Progress: ", progress);
      $('.progress .progress-bar').css(
          'width',
          progress + '%'
      );
    },

    downloadTemplate: function (o) {
        var rows = $();
        $.each(o.files, function (index, file) {

          console.log("File URL To diplay: ", file.url);
          console.log("File Error: ", file.error);


            var row =  $('<div class="col-md-4">' +
                            '<div class="hwk-thumbnail" id="picture_' + file.picture_id + '">' +
                              '<div class="hwk-thumbnail-crop">' +
                                '<img class="hwk-thumbnail-img" src="' + file.url +'" alt="">' +
                              '</div>' +
                              '<div class="hwk-caption">' +

                                '<div class="image-url">' +
                                  '<label><b>Refresh Page to see URLs</b></label>' +
                                '</div>' +

                              '</div>' +
                            '</div>' +
                          '</div>');

                          // <div class="hwk-thumbnail" id="picture_<%= pic.id %>">
                          //   <div class="hwk-thumbnail-crop">
                          //     <img class="hwk-thumbnail-img" src="<%= pic.image.preview.url %>" alt="">
                          //   </div>

            // var row = $('<li class="span3" id="picture_' + file.picture_id + '">' +
            //     (file.error ? '<div class="name"></div>' +
            //         '<div class="size"></div><div class="error" ></div>' :
            //           '<div class="thumbnail">' +
            //             '<a href="' + file.url +'" rel="lightbox-pictures" class="picture_' + file.id + '" title="<%= pic.description %>">' +
            //               '<img src="" alt="">') +
            //             '</a>' +
            //             '<div class="caption">' +
            //               '<p style="text-align: center;">' +
            //                 '<a href="" class="btn btn-primary btn-show" style="margin-right: 4px;">' +
            //                   '<i class="icon-edit "></i>' +
            //                   'Edit' +
            //                 '</a>' +
            //                 '<a class="btn btn-primary btn-delete" confirm="Delete this guy?" data-remote=true data-method="delete" href="" >' +
            //                   '<i class="icon-trash"></i>' +
            //                   'Delete' +
            //                 '</a>' +
            //               '</p>' +
            //             '</div>' +
            //           '</div>');


            if (file.error) {
              console.log("ERROR UPLOADING FILE")
                // row.find('.name').text(file.name);
                // row.find('.error').text(
                //     locale.fileupload.errors[file.error] || file.error
                // );
            } else {
                if (file.preview_url) {
                    row.find('img').prop('src', file.preview_url);
                }
                row.find('.btn-delete')
                    .attr('href', '/galleries/' + $("#galleryID").val() + '/pictures/' + file.picture_id);
                row.find('.btn-show')
                    .attr('href', '/galleries/' + $("#galleryID").val() + '/pictures/' + file.picture_id + '/edit');
            }
            rows = rows.add(row);
        });
        return rows;
    }

  });
});
