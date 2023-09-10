!function(a){"use strict";function r(t,i,o){var a,n=document.createElement("img");return n.onerror=function(e){return r.onerror(n,e,t,i,o)},n.onload=function(e){return r.onload(n,e,t,i,o)},"string"==typeof t?(r.fetchBlob(t,function(e){e&&r.isInstanceOf("Blob",e)?a=r.createObjectURL(t=e):(a=t,o&&o.crossOrigin&&(n.crossOrigin=o.crossOrigin)),n.src=a},o),n):r.isInstanceOf("Blob",t)||r.isInstanceOf("File",t)?(a=n._objectURL=r.createObjectURL(t))?(n.src=a,n):r.readFile(t,function(e){var t=e.target;t&&t.result?n.src=t.result:i&&i(e)}):void 0}var t=a.createObjectURL&&a||a.URL&&URL.revokeObjectURL&&URL||a.webkitURL&&webkitURL;function n(e,t){!e._objectURL||t&&t.noRevoke||(r.revokeObjectURL(e._objectURL),delete e._objectURL)}r.fetchBlob=function(e,t){t()},r.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},r.transform=function(e,t,i,o,a){i(e,a)},r.onerror=function(e,t,i,o,a){n(e,a),o&&o.call(e,t)},r.onload=function(e,t,i,o,a){n(e,a),o&&r.transform(e,a,o,i,{originalWidth:e.naturalWidth||e.width,originalHeight:e.naturalHeight||e.height})},r.createObjectURL=function(e){return!!t&&t.createObjectURL(e)},r.revokeObjectURL=function(e){return!!t&&t.revokeObjectURL(e)},r.readFile=function(e,t,i){if(a.FileReader){var o=new FileReader;if(o.onload=o.onerror=t,o[i=i||"readAsDataURL"])return o[i](e),o}return!1},"function"==typeof define&&define.amd?define(function(){return r}):"object"==typeof module&&module.exports?module.exports=r:a.loadImage=r}("undefined"!=typeof window&&window||this),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image"],e):"object"==typeof module&&module.exports?e(require("./load-image")):e(window.loadImage)}(function(x){"use strict";var n=x.transform;x.transform=function(e,t,i,o,a){n.call(x,x.scale(e,t,a),t,i,o,a)},x.transformCoordinates=function(){},x.getTransformedOptions=function(e,t){var i,o,a,n=t.aspectRatio;if(!n)return t;for(o in i={},t)Object.prototype.hasOwnProperty.call(t,o)&&(i[o]=t[o]);return i.crop=!0,n<(a=e.naturalWidth||e.width)/(e=e.naturalHeight||e.height)?(i.maxWidth=e*n,i.maxHeight=e):(i.maxWidth=a,i.maxHeight=a/n),i},x.renderImageToCanvas=function(e,t,i,o,a,n,r,s,l,c){return e.getContext("2d").drawImage(t,i,o,a,n,r,s,l,c),e},x.hasCanvasOption=function(e){return e.canvas||e.crop||!!e.aspectRatio},x.scale=function(e,t,i){t=t||{};var o,a,n,r,s,l,c,d,u,f=document.createElement("canvas"),g=e.getContext||x.hasCanvasOption(t)&&f.getContext,p=e.naturalWidth||e.width,h=e.naturalHeight||e.height,m=p,b=h;function y(){var e=Math.max((n||m)/m,(r||b)/b);1<e&&(m*=e,b*=e)}function S(){var e=Math.min((o||m)/m,(a||b)/b);e<1&&(m*=e,b*=e)}if(g&&(c=(t=x.getTransformedOptions(e,t,i)).left||0,d=t.top||0,t.sourceWidth?(s=t.sourceWidth,void 0!==t.right&&void 0===t.left&&(c=p-s-t.right)):s=p-c-(t.right||0),t.sourceHeight?(l=t.sourceHeight,void 0!==t.bottom&&void 0===t.top&&(d=h-l-t.bottom)):l=h-d-(t.bottom||0),m=s,b=l),o=t.maxWidth,a=t.maxHeight,n=t.minWidth,r=t.minHeight,g&&o&&a&&t.crop?(i=s/l-(m=o)/(b=a))<0?(l=a*s/o,void 0===t.top&&void 0===t.bottom&&(d=(h-l)/2)):0<i&&(s=o*l/a,void 0===t.left)&&void 0===t.right&&(c=(p-s)/2):((t.contain||t.cover)&&(n=o=o||n,r=a=a||r),(t.cover?(S(),y):(y(),S))()),g){if(1<(h=t.pixelRatio)&&(f.style.width=m+"px",f.style.height=b+"px",m*=h,b*=h,f.getContext("2d").scale(h,h)),0<(u=t.downsamplingRatio)&&u<1&&m<s&&b<l)for(;m<s*u;)f.width=s*u,f.height=l*u,x.renderImageToCanvas(f,e,c,d,s,l,0,0,f.width,f.height),d=c=0,s=f.width,l=f.height,(e=document.createElement("canvas")).width=s,e.height=l,x.renderImageToCanvas(e,f,0,0,s,l,0,0,s,l);return f.width=m,f.height=b,x.transformCoordinates(f,t),x.renderImageToCanvas(f,e,c,d,s,l,0,0,m,b)}return e.width=m,e.height=b,e}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image"],e):"object"==typeof module&&module.exports?e(require("./load-image")):e(window.loadImage)}(function(g){"use strict";var e="undefined"!=typeof Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice),n=(g.blobSlice=e&&function(){return(this.slice||this.webkitSlice||this.mozSlice).apply(this,arguments)},g.metaDataParsers={jpeg:{65505:[],65517:[]}},g.parseMetaData=function(e,c,d,u){u=u||{};var f=this,t=(d=d||{}).maxMetaDataSize||262144;"undefined"!=typeof DataView&&e&&12<=e.size&&"image/jpeg"===e.type&&g.blobSlice&&g.readFile(g.blobSlice.call(e,0,t),function(e){if(e.target.error)console.log(e.target.error);else{var t,i,o,a,e=e.target.result,n=new DataView(e),r=2,s=n.byteLength-4,l=r;if(65496===n.getUint16(0)){for(;r<s&&(65504<=(t=n.getUint16(r))&&t<=65519||65534===t);){if(r+(i=n.getUint16(r+2)+2)>n.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(o=g.metaDataParsers.jpeg[t])for(a=0;a<o.length;a+=1)o[a].call(f,n,r,i,u,d);l=r+=i}!d.disableImageHead&&6<l&&(e.slice?u.imageHead=e.slice(0,l):u.imageHead=new Uint8Array(e).subarray(0,l))}else console.log("Invalid JPEG file: Missing JPEG marker.")}c(u)},"readAsArrayBuffer")||c(u)},g.hasMetaOption=function(e){return e&&e.meta},g.transform);g.transform=function(t,i,o,a,e){g.hasMetaOption(i)?g.parseMetaData(a,function(e){n.call(g,t,i,o,a,e)},i,e):n.apply(g,arguments)}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(a){"use strict";"undefined"!=typeof fetch&&"undefined"!=typeof Request?a.fetchBlob=function(e,t,i){a.hasMetaOption(i)?fetch(new Request(e,i)).then(function(e){return e.blob()}).then(t).catch(function(e){console.log(e),t()}):t()}:"undefined"!=typeof XMLHttpRequest&&"undefined"!=typeof ProgressEvent&&(a.fetchBlob=function(e,t,i){var o;a.hasMetaOption(i)?(i=i||{},(o=new XMLHttpRequest).open(i.method||"GET",e),i.headers&&Object.keys(i.headers).forEach(function(e){o.setRequestHeader(e,i.headers[e])}),o.withCredentials="include"===i.credentials,o.responseType="blob",o.onload=function(){t(o.response)},o.onerror=o.onabort=o.ontimeout=function(e){console.log(e),t()},o.send(i.body)):t()})}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-scale","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-scale"),require("./load-image-meta")):e(window.loadImage)}(function(s){"use strict";var t=s.hasCanvasOption,i=s.hasMetaOption,l=s.transformCoordinates,r=s.getTransformedOptions;s.hasCanvasOption=function(e){return!!e.orientation||t.call(s,e)},s.hasMetaOption=function(e){return e&&!0===e.orientation||i.call(s,e)},s.transformCoordinates=function(e,t){l.call(s,e,t);var i=e.getContext("2d"),o=e.width,a=e.height,n=e.style.width,r=e.style.height,t=t.orientation;if(t&&!(8<t))switch(4<t&&(e.width=a,e.height=o,e.style.width=r,e.style.height=n),t){case 2:i.translate(o,0),i.scale(-1,1);break;case 3:i.translate(o,a),i.rotate(Math.PI);break;case 4:i.translate(0,a),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-a);break;case 7:i.rotate(.5*Math.PI),i.translate(o,-a),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-o,0)}},s.getTransformedOptions=function(e,t,i){var o,a,n=r.call(s,e,t),e=n.orientation;if(!(e=!0===e&&i&&i.exif?i.exif.get("Orientation"):e)||8<e||1===e)return n;for(a in o={},n)Object.prototype.hasOwnProperty.call(n,a)&&(o[a]=n[a]);switch(o.orientation=e){case 2:o.left=n.right,o.right=n.left;break;case 3:o.left=n.right,o.top=n.bottom,o.right=n.left,o.bottom=n.top;break;case 4:o.top=n.bottom,o.bottom=n.top;break;case 5:o.left=n.top,o.top=n.left,o.right=n.bottom,o.bottom=n.right;break;case 6:o.left=n.top,o.top=n.right,o.right=n.bottom,o.bottom=n.left;break;case 7:o.left=n.bottom,o.top=n.right,o.right=n.top,o.bottom=n.left;break;case 8:o.left=n.bottom,o.top=n.left,o.right=n.top,o.bottom=n.right}return 4<o.orientation&&(o.maxWidth=n.maxHeight,o.maxHeight=n.maxWidth,o.minWidth=n.minHeight,o.minHeight=n.minWidth,o.sourceWidth=n.sourceHeight,o.sourceHeight=n.sourceWidth),o}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(f){"use strict";f.ExifMap=function(){return this},f.ExifMap.prototype.map={Orientation:274},f.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},f.getExifThumbnail=function(e,t,i){if(i&&!(t+i>e.byteLength))return f.createObjectURL(new Blob([e.buffer.slice(t,t+i)]));console.log("Invalid Exif data: Invalid thumbnail data.")},f.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},f.exifTagTypes[7]=f.exifTagTypes[1],f.getExifValue=function(e,t,i,o,a,n){var r,s,l,c,d,u=f.exifTagTypes[o];if(u){if(!((r=4<(o=u.size*a)?t+e.getUint32(i+8,n):i+8)+o>e.byteLength)){if(1===a)return u.getValue(e,r,n);for(s=[],l=0;l<a;l+=1)s[l]=u.getValue(e,r+l*u.size,n);if(u.ascii){for(c="",l=0;l<s.length&&"\0"!==(d=s[l]);l+=1)c+=d;return c}return s}console.log("Invalid Exif data: Invalid data offset.")}else console.log("Invalid Exif data: Invalid tag type.")},f.parseExifTag=function(e,t,i,o,a){var n=e.getUint16(i,o);a.exif[n]=f.getExifValue(e,t,i,e.getUint16(i+2,o),e.getUint32(i+4,o),o)},f.parseExifTags=function(e,t,i,o,a){var n,r,s;if(i+6>e.byteLength)console.log("Invalid Exif data: Invalid directory offset.");else{if(!((r=i+2+12*(n=e.getUint16(i,o)))+4>e.byteLength)){for(s=0;s<n;s+=1)this.parseExifTag(e,t,i+2+12*s,o,a);return e.getUint32(r,o)}console.log("Invalid Exif data: Invalid directory size.")}},f.parseExifData=function(e,t,i,o,a){if(!a.disableExif){var n,r=t+10;if(1165519206===e.getUint32(t+4))if(r+8>e.byteLength)console.log("Invalid Exif data: Invalid segment size.");else if(0===e.getUint16(t+8)){switch(e.getUint16(r)){case 18761:n=!0;break;case 19789:n=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}42===e.getUint16(r+2,n)?(t=e.getUint32(r+4,n),o.exif=new f.ExifMap,(t=f.parseExifTags(e,r,r+t,n,o))&&!a.disableExifThumbnail&&(f.parseExifTags(e,r,r+t,n,t={exif:{}}),t.exif[513])&&(o.exif.Thumbnail=f.getExifThumbnail(e,r+t.exif[513],t.exif[514])),o.exif[34665]&&!a.disableExifSub&&f.parseExifTags(e,r,r+o.exif[34665],n,o),o.exif[34853]&&!a.disableExifGps&&f.parseExifTags(e,r,r+o.exif[34853],n,o)):console.log("Invalid Exif data: Missing TIFF marker.")}else console.log("Invalid Exif data: Missing byte alignment offset.")}},f.metaDataParsers.jpeg[65505].push(f.parseExifData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-exif"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-exif")):e(window.loadImage)}(function(e){"use strict";e.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},e.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},e.ExifMap.prototype.getText=function(e){var t=this.get(e);switch(e){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[e][t];case"ExifVersion":case"FlashpixVersion":return t?String.fromCharCode(t[0],t[1],t[2],t[3]):void 0;case"ComponentsConfiguration":return t?this.stringValues[e][t[0]]+this.stringValues[e][t[1]]+this.stringValues[e][t[2]]+this.stringValues[e][t[3]]:void 0;case"GPSVersionID":return t?t[0]+"."+t[1]+"."+t[2]+"."+t[3]:void 0}return String(t)};var t,i=e.ExifMap.prototype,o=i.tags,a=i.map;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(a[o[t]]=t);e.ExifMap.prototype.getAll=function(){var e,t,i={};for(e in this)Object.prototype.hasOwnProperty.call(this,e)&&(t=this.tags[e])&&(i[t]=this.getText(t));return i}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(l){"use strict";l.IptcMap=function(){return this},l.IptcMap.prototype.map={ObjectName:5},l.IptcMap.prototype.get=function(e){return this[e]||this[this.map[e]]},l.parseIptcTags=function(e,t,i,o){for(var a,n,r=t;r<t+i;)28===e.getUint8(r)&&2===e.getUint8(r+1)&&(n=e.getUint8(r+2))in o.iptc.tags&&(a=e.getInt16(r+3),a=function(e,t,i){for(var o="",a=t;a<t+i;a++)o+=String.fromCharCode(e.getUint8(a));return o}(e,r+5,a),Object.prototype.hasOwnProperty.call(o.iptc,n)?o.iptc[n]instanceof Array?o.iptc[n].push(a):o.iptc[n]=[o.iptc[n],a]:o.iptc[n]=a),r++},l.parseIptcData=function(e,t,i,o,a){if(!a.disableIptc){for(var n=t+i;t+8<n;){if(s=t,943868237===(r=e).getUint32(s)&&1028===r.getUint16(s+4)){var r=e.getUint8(t+7),s=(r%2!=0&&(r+=1),t+8+(r=0===r?4:r));if(n<s){console.log("Invalid IPTC data: Invalid segment offset.");break}r=e.getUint16(t+6+r);if(n<t+r){console.log("Invalid IPTC data: Invalid segment size.");break}return o.iptc=new l.IptcMap,l.parseIptcTags(e,s,r,o)}t++}console.log("No IPTC data at this offset - could be XMP")}},l.metaDataParsers.jpeg[65517].push(l.parseIptcData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-iptc"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-iptc")):e(window.loadImage)}(function(e){"use strict";e.IptcMap.prototype.tags={3:"ObjectType",4:"ObjectAttribute",5:"ObjectName",7:"EditStatus",8:"EditorialUpdate",10:"Urgency",12:"SubjectRef",15:"Category",20:"SupplCategory",22:"FixtureID",25:"Keywords",26:"ContentLocCode",27:"ContentLocName",30:"ReleaseDate",35:"ReleaseTime",37:"ExpirationDate",38:"ExpirationTime",40:"SpecialInstructions",42:"ActionAdvised",45:"RefService",47:"RefDate",50:"RefNumber",55:"DateCreated",60:"TimeCreated",62:"DigitalCreationDate",63:"DigitalCreationTime",65:"OriginatingProgram",70:"ProgramVersion",75:"ObjectCycle",80:"Byline",85:"BylineTitle",90:"City",92:"Sublocation",95:"State",100:"CountryCode",101:"CountryName",103:"OrigTransRef",105:"Headline",110:"Credit",115:"Source",116:"CopyrightNotice",118:"Contact",120:"Caption",122:"WriterEditor",130:"ImageType",131:"ImageOrientation",135:"LanguageID"},e.IptcMap.prototype.getText=function(e){e=this.get(e);return String(e)};var t,i=e.IptcMap.prototype,o=i.tags,a=i.map||{};for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(a[o[t]]=t);e.IptcMap.prototype.getAll=function(){var e,t,i={};for(e in this)Object.prototype.hasOwnProperty.call(this,e)&&(t=this.tags[e])&&(i[t]=this.getText(t));return i}});
HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(s,o,e){var l=this.toDataURL(o,e).split(",")[1];setTimeout(function(){for(var e=atob(l),a=e.length,t=new Uint8Array(a),i=0;i<a;i++)t[i]=e.charCodeAt(i);s(new Blob([t],{type:o||"image/png"}))})}}),function(r){r.fn.fileuploader=function(e){Global.isset(e.endpoint)||(e.endpoint=CONFIG.api_base_url+"fileupload"),void 0===e.autoupload&&(e.autoupload=!0);var a=this;for(i=0;i<a.length;i++){var t=r(a[i]);t.off("x-upload").on("x-upload",function(e,a){var t=r(this),i=t.data("args"),s=t[0];if(s.files&&s.files[0]){(Global.isset(i)&&Global.isset(i.loading)?i:Global).loading();var o=r(s).data(),l={};for(x in o)l[x]=o[x];var n=[];for(fi=0;fi<s.files.length;fi++)"image/jpeg"==s.files[fi].type||"image/jpg"==s.files[fi].type?loadImage(s.files[fi],function(e,a){var t,i=this.args,s=this.file,o=this.dataparams,l=this.obj,n=document.createElement("canvas"),r=e.width,d=e.height,n=(Global.isset(this.args)&&Global.isset(this.args.compressimage)&&(d=(r=800)*e.height/e.width,r>e.width)&&(r=e.width,d=e.height),n.width=r,n.height=d,n.getContext("2d")),e=(n.drawImage(e,0,0,r,d),n.canvas.toDataURL("image/jpeg",.92));t=function(e){var a=this.args,t=this.compressedfileurl,i=this.file,s=this.dataparams,o=this.obj,l=(Global.isset(a)&&Global.isset(a.onselect)&&a.onselect(t,i,s),new FormData);for(x in l.append("file",e,i.name),s)l.append(x,s[x]);var t=a.endpoint,n=new XMLHttpRequest;n.open("POST",t,!0),n.onreadystatechange=function(){var e=this.args,a=this.obj;if(4==n.readyState&&200==n.status){var t={};try{var i=n.responseText;t=(t=JSON.parse(i)).data}catch(e){alert(e.message)}e.done(t,a)}(Global.isset(e)&&Global.isset(e.hideLoading)?e:Global).hideLoading()}.bind({args:a,obj:o}),n.upload.addEventListener("progress",function(e){var a=this.args,t=this.file;e.lengthComputable&&Global.isset(a)&&Global.isset(a.onuploadprogress)&&a.onuploadprogress(t,e.loaded,e.total)}.bind({args:a,file:i}),!1),n.send(l)}.bind({args:i,compressedfileurl:r=e,file:s,dataparams:o,obj:l}),(d=new XMLHttpRequest).open("GET",r),d.responseType="arraybuffer",d.onload=function(e){var a=this.getResponseHeader("content-type");t(new Blob([this.response],{type:a}))},d.send()}.bind({args:i,file:s.files[fi],dataparams:l,obj:t}),{orientation:!0}):(n[fi]=new FileReader,n[fi].onload=function(e){var a=this.args,t=this.file,i=this.reader,s=this.dataparams,o=this.obj,l=(Global.isset(a)&&Global.isset(a.onselect)&&a.onselect(i.result,t,s),new FormData);for(x in l.append("file",t),s)l.append(x,s[x]);var i=a.endpoint,n=new XMLHttpRequest;n.open("POST",i,!0),n.onreadystatechange=function(){var e=this.args,a=this.obj;if(4==n.readyState&&200==n.status){var t={};try{var i=n.responseText;t=(t=JSON.parse(i)).data}catch(e){alert(e.message)}e.done(t,a)}(Global.isset(e)&&Global.isset(e.hideLoading)?e:Global).hideLoading()}.bind({args:a,obj:o}),n.upload.addEventListener("progress",function(e){var a=this.args,t=this.file;e.lengthComputable&&Global.isset(a)&&Global.isset(a.onuploadprogress)&&a.onuploadprogress(t,e.loaded,e.total)}.bind({args:a,file:t}),!1),n.send(l)}.bind({args:i,file:s.files[fi],reader:n[fi],dataparams:l,obj:t}),n[fi].readAsDataURL(s.files[fi]))}}).data("args",e),t.off("change").on("change",function(e,a){var t=r(this),i=t.data("args"),s=t[0];if(i.autoupload)t.trigger("x-upload",["true"]);else if(s.files&&s.files[0]){var o=r(s).data(),l={};for(x in o)l[x]=o[x];var n=[];for(fi=0;fi<s.files.length;fi++)"image/jpeg"==s.files[fi].type||"image/jpg"==s.files[fi].type?loadImage(s.files[fi],function(e,a){var t=this.args,i=this.file,s=this.dataparams,o=document.createElement("canvas"),l=e.width,n=e.height,o=(Global.isset(t)&&Global.isset(t.compressimage)&&(n=(l=800)*e.height/e.width,l>e.width)&&(l=e.width,n=e.height),o.width=l,o.height=n,o.getContext("2d")),e=(o.drawImage(e,0,0,l,n),o.canvas.toDataURL("image/jpeg",.92));Global.isset(t)&&Global.isset(t.onselect)&&t.onselect(e,i,s)}.bind({args:i,file:s.files[fi],dataparams:l}),{orientation:!0}):(n[fi]=new FileReader,n[fi].onload=function(e){var a=this.args,t=this.reader,i=this.file,s=this.dataparams;Global.isset(a)&&Global.isset(a.onselect)&&a.onselect(t.result,i,s)}.bind({args:i,file:s.files[fi],reader:n[fi],dataparams:l}),n[fi].readAsDataURL(s.files[fi]))}}).data("args",e)}return a}}(jQuery);
var FS={localStore:1,writeFile:function(t,n,e){if(FS.localStore)return window.localStorage.setItem(t,n),e(!0),0;window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem;var i=function(e,t){e.createWriter(function(e){e.onwriteend=function(){this.callback(!0)}.bind({callback:this.callback}),e.onerror=function(e){this.callback(!1)}.bind({callback:this.callback}),e.write(t)}.bind({callback:this.callback}))}.bind({callback:e});window.requestFileSystem(1,0,function(e){e.root.getFile(t,{create:!0,exclusive:!1},function(e){i(e,n)},function(){alert("onErrorCreateFile")})},function(){alert("onErrorLoadFs")})},readFile:function(t,e){if(FS.localStore)return e(window.localStorage.getItem(t)),0;window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem;var n=function(e){e.file(function(e){var t=new FileReader;t.onloadend=function(){this.callback(this.reader.result)}.bind({callback:this.callback,reader:t}),t.readAsText(e)}.bind({callback:this.callback}),function(){alert("onErrorReadFile")})}.bind({callback:e});window.requestFileSystem(1,0,function(e){e.root.getFile(t,{create:!0,exclusive:!1},function(e){n(e)},function(){alert("onErrorCreateFile")})},function(){alert("onErrorLoadFs")})},readBinaryFile:function(e,t){if(FS.localStore)return n=window.localStorage.getItem(e),t(n),0;var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="blob",n.onload=function(){var e=new Blob([this.response]);URL.createObjectURL(e);t(e)},n.send()}};
var LOCALDATA={get:function(A,L=()=>{}){A="LOCALDATA_"+A,localforage.getItem(A,(A,e)=>{L(e)})},save:function(A,e,L=()=>{}){A="LOCALDATA_"+A,localforage.setItem(A,e,()=>{L()})},purge:function(A,e){LOCALDATA.save(A="LOCALDATA_"+A,"",e)}};
var CHARTS={fetch:function(a,t,e){CHARTS.ajax({method:"POST",url:a.uri,data:a,success:function(a){t(a)},error:e})},pieUI:function(a,t,e){var o=t.find(".x-pie"),i=t.find(".x-pie-info"),d=e.data.piedata,n=e.data.infodata,r=[];for(row of d)r.push(row.color);e=o.parent().next().find(".legend");for(x in $.plot(o,d,{series:{pie:{show:!0,highlight:{opacity:.1}}},grid:{hoverable:!0},legend:{container:e},colors:r}),n)$(t.find(".x-pie-info").find(".x-title")[x]).text(n[x].label),$(t.find(".x-pie-info").find(".x-toggle")[x]).attr("data-end",n[x].data);i.find(".x-toggle").each(function(a,t){var e=$(this),o="",i="",d=0,n=0,r=0,l=2.5;e.data("prefix")&&(o=e.data("prefix")),e.data("suffix")&&(i=e.data("suffix")),e.data("start")&&(d=e.data("start")),e.data("end")&&(n=e.data("end")),e.data("decimals")&&(r=e.data("decimals")),e.data("duration")&&(l=e.data("duration")),new CountUp(e.get(0),d,n,r,l,{suffix:i,prefix:o}).start()})},ajax:function(o){Global.log(o.data);var a="";Global.isset(o.data)&&Global.isset(o.data.noloading)&&(a=o.data.noloading),Global.isset(a)?delete o.data.noloading:Global.loading(),$.ajax({method:o.method,dataType:"json",timeout:3e4,url:"/api/charts/"+o.url,data:o.data,beforeSend:function(e){Global.isset(o.headers)&&$.each(o.headers,function(a,t){e.setRequestHeader(a,t)})},success:function(a,t,e){Global.isset(a.error)?o.error(a.error,a):o.success(a),Global.hideLoading()},error:function(a,t,e){o.error("Connection error"),Global.hideLoading()}})}};