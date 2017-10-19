<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles-extras"
	prefix="tilesx"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<!DOCTYPE html>
<html lang="vi">
<head>
<title>${title}</title>
<link rel="manifest" href="/resources/manifest.json">
<meta name="description" content="#">
<meta name="keywords" content="#">
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=0">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<link rel="icon" href="resources/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="/resources/images/icon_logo.png"
	type="image/x-icon">

<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

<tilesx:useAttribute id="listCss" name="stylesheets"
	classname="java.util.List" />
<c:forEach var="item" items="${listCss}">
	<link rel="stylesheet" href="${pageContext.request.contextPath}${item}" />
</c:forEach>

<script type="text/javascript">
		var BASE_URL = "${pageContext.request.contextPath}";
		console.log(BASE_URL);
	</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5D873W5');</script>
<!-- End Google Tag Manager -->

</head>
<body>
	<tiles:insertAttribute name="header" />
	<div class="container-fluid">
		<div class="row">
			<tiles:insertAttribute name="menu" />

			<%--<div class="col-sm-4 col-sm-offset-3 col-md-6 col-md-offset-3  mobile-padding">--%>
			<tiles:insertAttribute name="body" />
			<%--</div>--%>

			<tiles:insertAttribute name="footer" />
		</div>
	</div>
	<jsp:include page="messenger.jsp"></jsp:include>
	<!-- ./scripts -->
	<tilesx:useAttribute id="listJs" name="scripts"
		classname="java.util.List" />
	<c:forEach var="item" items="${listJs}">
		<script src="${pageContext.request.contextPath }${item}"></script>
	</c:forEach>


	<!-- Google Tag Manager (noscript) -->
	<noscript>
		<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5D873W5"
			height="0" width="0" style="display: none; visibility: hidden"></iframe>
	</noscript>
	<!-- End Google Tag Manager (noscript) -->
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async
		src="https://www.googletagmanager.com/gtag/js?id=UA-107421702-1"></script>
	<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-107421702-1');
</script>

</body>
</html>