<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" pageEncoding="UTF-8"%><%@ page
	contentType="text/html;charset=UTF-8"%>
<style>
.fb-livechat, .fb-widget {
	display: none
}

.ctrlq.fb-button, .ctrlq.fb-close {
	position: fixed;
	right: 24px;
	cursor: pointer
}

.ctrlq.fb-button {
	z-index: 1;
	background:
		url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGhlaWdodD0iMTI4cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iMTI4cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxyZWN0IGZpbGw9IiMwMDg0RkYiIGhlaWdodD0iMTI4IiB3aWR0aD0iMTI4Ii8+PC9nPjxwYXRoIGQ9Ik02NCwxNy41MzFjLTI1LjQwNSwwLTQ2LDE5LjI1OS00Niw0My4wMTVjMCwxMy41MTUsNi42NjUsMjUuNTc0LDE3LjA4OSwzMy40NnYxNi40NjIgIGwxNS42OTgtOC43MDdjNC4xODYsMS4xNzEsOC42MjEsMS44LDEzLjIxMywxLjhjMjUuNDA1LDAsNDYtMTkuMjU4LDQ2LTQzLjAxNUMxMTAsMzYuNzksODkuNDA1LDE3LjUzMSw2NCwxNy41MzF6IE02OC44NDUsNzUuMjE0ICBMNTYuOTQ3LDYyLjg1NUwzNC4wMzUsNzUuNTI0bDI1LjEyLTI2LjY1N2wxMS44OTgsMTIuMzU5bDIyLjkxLTEyLjY3TDY4Ljg0NSw3NS4yMTR6IiBmaWxsPSIjRkZGRkZGIiBpZD0iQnViYmxlX1NoYXBlIi8+PC9zdmc+)
		center no-repeat #0084ff;
	width: 60px;
	height: 60px;
	text-align: center;
	bottom: 24px;
	border: 0;
	outline: 0;
	border-radius: 60px;
	-webkit-border-radius: 60px;
	-moz-border-radius: 60px;
	-ms-border-radius: 60px;
	-o-border-radius: 60px;
	box-shadow: 0 1px 6px rgba(0, 0, 0, .06), 0 2px 32px rgba(0, 0, 0, .16);
	-webkit-transition: box-shadow .2s ease;
	background-size: 80%;
	transition: all .2s ease-in-out
}

.ctrlq.fb-button:focus, .ctrlq.fb-button:hover {
	transform: scale(1.1);
	box-shadow: 0 2px 8px rgba(0, 0, 0, .09), 0 4px 40px rgba(0, 0, 0, .24)
}

.fb-widget {
	background: #fff;
	z-index: 2;
	position: fixed;
	width: 360px;
	height: 435px;
	overflow: hidden;
	opacity: 0;
	bottom: 0;
	right: 24px;
	border-radius: 6px;
	-o-border-radius: 6px;
	-webkit-border-radius: 6px;
	box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
	-webkit-box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
	-moz-box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
	-o-box-shadow: 0 5px 40px rgba(0, 0, 0, .16)
}

.fb-credit {
	text-align: center;
	margin-top: 8px
}

.fb-credit a {
	transition: none;
	color: #bec2c9;
	font-family: Helvetica, Arial, sans-serif;
	font-size: 12px;
	text-decoration: none;
	border: 0;
	font-weight: 400
}

.ctrlq.fb-overlay {
	z-index: 0;
	position: fixed;
	height: 100vh;
	width: 100vw;
	-webkit-transition: opacity .4s, visibility .4s;
	transition: opacity .4s, visibility .4s;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, .05);
	display: none
}

.ctrlq.fb-close {
	z-index: 4;
	padding: 0 6px;
	background: #365899;
	font-weight: 700;
	font-size: 11px;
	color: #fff;
	margin: 8px;
	border-radius: 3px
}

.ctrlq.fb-close::after {
	content: 'x';
	font-family: sans-serif
}
</style>

<div class="fb-livechat">
	<div class="ctrlq fb-overlay" title="Nhắn tin cho chúng tôi"></div>
	<div class="fb-widget">
		<div class="ctrlq fb-close"></div>
		<div class="fb-page"
			data-href="https://www.facebook.com/xenhan.vn"
			data-tabs="messages" data-small-header="true"
			data-height="400" data-width="350"
			data-adapt-container-width="true" data-hide-cover="true"
			data-show-facepile="true">
			<blockquote cite="https://www.facebook.com/xenhan.vn"
				class="fb-xfbml-parse-ignore">
				<a href="https://www.facebook.com/xenhan.vn">Xe Nhàn</a>
			</blockquote>
		</div>
		<div id="fb-root"></div>
	</div>
	<a href="https://m.me/xenhan.vn"
		title="Nhắn tin cho chúng tôi" class="ctrlq fb-button"></a>
</div>