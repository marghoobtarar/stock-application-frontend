/*
    ng-youtube-embed v1.7.16
    Copyright (c) 2015 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
    Demo on CodePen - http://codepen.io/amdsouza92/pen/yNxyJV
*/
  "use strict";
  function a() {
    var a = document.createElement("script"),
      b = document.getElementsByTagName("script")[0];
    (a.src = g), b.parentNode.insertBefore(a, b);
  }
  function b() {
    for (
      var a = g, b = document.getElementsByTagName("script"), c = b.length;
      c--;

    )
      if (b[c].src == a) return !0;
    return !1;
  }
  function c(a, b, c) {
    var d = c ? c : "";
    if (!a.origin) {
      var e = location.protocol,
        f = e.concat("//"),
        g = f.concat(window.location.hostname);
      a.origin = g;
    }
    var h =
      "enablejsapi=" +
      a.enablejsapi +
      "&autoplay=" +
      a.autoplay +
      "&cc_load_policy=" +
      a.ccloadpolicy +
      "&color=" +
      a.color +
      "&controls=" +
      a.controls +
      "&disablekb=" +
      a.disablekb +
      "&end=" +
      a.end +
      "&fs=" +
      a.fs +
      "&hl=" +
      a.hl +
      "&iv_load_policy=" +
      a.ivloadpolicy +
      "&playlist=" +
      b.playlistArray +
      "&playsinline=" +
      a.playsinline +
      "&rel=" +
      a.rel +
      "&showinfo=" +
      a.showinfo +
      "&start=" +
      a.start +
      "&modestbranding=" +
      a.modestbranding +
      "&loop=" +
      a.loop +
      "&listType=" +
      a.listType +
      "&list=" +
      a.list +
      "&origin=" +
      a.origin;
    h = h
      .replace(/([a-zA-Z_]+=&)/g, "")
      .replace(/&$/, "")
      .replace(/([a-zA-Z_]+=$)/g, "");
    var i = "";
    window.onNgYtIframeLoad && (i = 'onLoad="onNgYtIframeLoad()"');
    var j =
      '<iframe id="' +
      a.videoid +
      '" width="' +
      a.width +
      '" height="' +
      a.height +
      '" src="https://www.youtube.com/embed/' +
      d +
      "?" +
      h +
      '" frameborder="0" allowfullscreen ' +
      i +
      "></iframe>";
    return (
      window.onNgYtIframeLoad ||
        (window.onNgYtIframeLoad = function() {
        }),
      j
    );
  }
  function d(a, b, d, e) {
    var f = c(a, b, e);
    b.youtubeEmbedFrame = d.trustAsHtml(f);
  }
  var e = angular.module("ngYoutubeEmbed", []),
    f = [],
    g = "https://www.youtube.com/iframe_api",
    h = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
    i = /^(?:https?:\/\/)?(?:www\.)?(?:gaming.youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  e.service("ngYoutubeEmbedService", [
    "$window",
    "$rootScope",
    function(a, b) {
      this.setReadyState = function() {
        a.onYouTubeIframeAPIReady = function() {
          f.forEach(function(a) {
            b.$emit("youtubeIframeEmbedApiLoaded", a);
          });
        };
      };
      var c = [];
      b.$on("addNewPlayer", function(a, b) {
        c[b.id] = b.player;
      }),
        (this.getPlayerById = function(a) {
          return c[a];
        }),
        (this.getVideoIdByUrl = function(a) {
          var b = a.indexOf("gaming") !== -1 ? i : h,
            c = a.match(b);
          return null !== c ? c[1] : a;
        });
    }
  ]),
    e.directive("ngYoutubeEmbed", [
      "$sce",
      "ngYoutubeEmbedService",
      "$rootScope",
      function(c, e, g) {
        return {
          restrict: "E",
          template: '<div ng-bind-html="youtubeEmbedFrame"></div>',
          scope: {
            video: "=",
            onready: "=",
            onstatechange: "=",
            onplaybackqualitychange: "=",
            onplaybackratechange: "=",
            onerror: "=",
            onapichange: "=",
            autoplay: "@",
            ccloadpolicy: "@",
            color: "@",
            controls: "@",
            disablekb: "@",
            end: "@end",
            fs: "@",
            hl: "@",
            ivloadpolicy: "@",
            playlist: "@",
            playsinline: "@",
            rel: "@",
            showinfo: "@",
            start: "@",
            width: "@",
            height: "@",
            enablejsapi: "@",
            videoid: "@",
            modestbranding: "@",
            loop: "@",
            listtype: "@",
            list: "@",
            origin: "@"
          },
          link: function(h, i, j) {
            i[0].removeAttribute("id");
            var k = {
              width: h.width ? h.width : 500,
              height: h.height ? h.height : 350,
              autoplay: "true" == h.autoplay ? 1 : 0,
              ccloadpolicy: "true" == h.ccloadpolicy ? 1 : 0,
              color: "white" == h.color ? "white" : "red",
              controls: "false" == h.controls ? 0 : 1,
              disablekb: "false" == h.disablekb ? 1 : 0,
              end: h.end ? h.end : "",
              fs: "false" == h.fs ? 0 : 1,
              hl: h.hl ? h.hl : "",
              ivloadpolicy: "false" == h.ivloadpolicy ? 3 : 1,
              playlist: h.playlist ? h.playlist : "",
              playsinline: "true" == h.playsinline ? 1 : 0,
              rel: "false" == h.rel ? 0 : 1,
              showinfo: "false" == h.showinfo ? 0 : 1,
              start: h.start ? h.start : "",
              enablejsapi: "true" === h.enablejsapi ? 1 : 0,
              videoid: h.videoid ? h.videoid : "",
              modestbranding: "true" === h.modestbranding ? 1 : 0,
              loop: "true" === h.loop ? 1 : "",
              listType: h.listtype ? h.listtype : "",
              list: h.list ? h.list : "",
              origin: h.origin ? h.origin : ""
            };
            if (
              (k.enablejsapi && !b() && (a(), e.setReadyState()),
              k.enablejsapi &&
                g.$on("youtubeIframeEmbedApiLoaded", function(a, b) {
                  if (b === k.videoid) {
                    var c = {};
                    h.onready && (c.onReady = h.onready),
                      h.onstatechange && (c.onStateChange = h.onstatechange),
                      h.onplaybackqualitychange &&
                        (c.onPlaybackQualityChange = h.onplaybackqualitychange),
                      h.onplaybackratechange &&
                        (c.onPlaybackRateChange = h.onplaybackratechange),
                      h.onerror && (c.onError = h.onerror),
                      h.onapichange && (c.onApiChange = h.onapichange);
                    var d = new YT.Player(b, { events: c });
                    g.$emit("addNewPlayer", { player: d, id: b });
                  }
                }),
              (h.playlistArray = []),
              k.playlist)
            )
              for (var l = h.playlist.split(","), m = 0; m < l.length; m++)
                h.playlistArray.push(e.getVideoIdByUrl(l[m]));
            k.videoid && k.enablejsapi ? f.push(k.videoid) : null,
              k.list &&
                (k.listType
                  ? d(k, h, c)
                  : console.warn(
                      "The list parameter works in conjunction with the listtype parameter, please provide a valid value for the listtype parameter in order to render a list. Read documentation here - https://github.com/ArunMichaelDsouza/ng-youtube-embed#list-string"
                    )),
              k.listType &&
                (k.list
                  ? d(k, h, c)
                  : console.warn(
                      "The listtype parameter works in conjunction with the list parameter, please provide a valid value for the list parameter in order to render a list. Read documentation here - https://github.com/ArunMichaelDsouza/ng-youtube-embed#listtype-string"
                    )),
              k.listType ||
                k.list ||
                h.video ||
                console.warn(
                  "Please provide a valid youtube video URL or ID to render the iframe embed player. Read documentation here - https://github.com/ArunMichaelDsouza/ng-youtube-embed"
                ),
              h.$watch("video", function(a) {
                if (a) {
                  var b = e.getVideoIdByUrl(a);
                  d(k, h, c, b);
                }
              });
          }
        };
      }
    ]);
