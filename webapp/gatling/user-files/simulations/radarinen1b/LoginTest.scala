package viadeGatling

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginTest extends Simulation {

	val httpProtocol = http
		.baseUrl("https://localhost:8443")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*""", """.*\.svg"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("en")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map(
		"Accept-Encoding" -> "gzip, deflate",
		"X-Requested-With" -> "XMLHttpRequest")

	val headers_3 = Map("Accept-Encoding" -> "gzip, deflate")

	val headers_4 = Map(
		"Accept-Encoding" -> "gzip, deflate",
		"Origin" -> "http://localhost:3000")

	val headers_6 = Map("Origin" -> "http://localhost:3000")

	val headers_8 = Map(
		"Origin" -> "http://localhost:3000",
		"content-type" -> "application/json")

	val headers_9 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_10 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Origin" -> "https://localhost:8443",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_14 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI0M2MzNmJhZjY0ZmQ5MmRiMmZmMWMxOWNkNGE5MDg1ZiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMiLCJleHAiOjE1ODgzNzE0NTQsImlhdCI6MTU4ODM2Nzg1NCwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWtoaVlrVkRaR2hITVZkekluMC5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyeHZZMkZzYUc5emREbzRORFF6SWl3aWMzVmlJam9pYUhSMGNITTZMeTlzYjJOaGJHaHZjM1E2T0RRME15OXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lJME0yTXpObUpoWmpZMFptUTVNbVJpTW1abU1XTXhPV05rTkdFNU1EZzFaaUlzSW1WNGNDSTZNVFU0T1RVM056UTFNeXdpYVdGMElqb3hOVGc0TXpZM09EVXpMQ0pxZEdraU9pSXhPREpoTVdNMk4yUXdZV1U0T1dSaklpd2libTl1WTJVaU9pSnRkRzh0WVhsc2JHZEhkekZDTmtac2FFcDJkVU42V1VSdlpIUkpkVEJwWWtWcE1EVlpkRFZCUnpJMElpd2lZWHB3SWpvaU5ETmpNelppWVdZMk5HWmtPVEprWWpKbVpqRmpNVGxqWkRSaE9UQTROV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUkxVG5obVEySktkMVpQUW5SUmNrVm5PR3RCZWxBM1RFdFZMVWhQWjBReFRFcDZjMFpHZUcxQ05tTXRhVkJQZVVGb01taG9kV0ZxU21WUU5HWTJkMUIyZVc1MU1HVnVUMm80Y1dOTU5USjRNbGREUWpZNFdqZG1jVWxaYkZWeE1HUnJWblpxUlVaNWMwUmxUM05ZZVhOTE5UZFllbFpIVVVjM2QzbERYMTlKTW1FNVltbDZUR3RCTW5KbU9ETjVUbWxaVUVkUmFYSTNjbGRqZWtGV1QwRllVMmd0ZEdwUVIyZFpYMmhrV2pSM1MzSTNiaTFGVEd0RlREQmxWM2hzWVdWSlIzQnFUR3N3TmxsUVVIZGpNbmRsV2xOcmNFVlJWa05HV0RscFNscFlNMnB4ZURoWVRHazFXVVozU1hCV00ybGZZVGhpUzNNeWJEWk9jMUZRZEhGa2EyOUxNRnBQUzFCVFYwdG1lRjgwYlhwUGJETlRjMW8yVTBsdlV6Tk9hR2hCWm1SaWJuRkhRM2xUVjBwck1sRkRXbkJCY0dWM2NURnFWVkpFT1c5TmJrNXlTMk5pUTBaVmRFWnRaamxTWVU5T1VqQjBOMUVpZlgwc0ltRjBYMmhoYzJnaU9pSm5VRWR0UmpGWVJqTlhjbWhVVlhSb1ZVbDRYM0puSW4wLnJVM09HbG5XN0hrdURSVGdYWDNucVJSREdLOHBQWWE4d3VuNUNxaWR1Vk1XSlhlQWNhMzc3UGxBcWgtZEJGOV9wc0JRdjlRZzNmRDNaWU9fQnZXa2pQYmZodXVxcUF3bFh3WFoza1F0YjQ0LUNHLUY1Ny1PendXZ2hHUC1QdG5XdzhoZ19OZW5rUW1iSnpNRnR4alhYd0hURndRamoxczBGcFktdm1wMXRFTmN3M0FDaEdqeklLZFZmS29DMmFfUi1rMkNmY3VubHFIX2tCVjBBWVZ0bmh0eTZVakJYdmU0Q1NMUFN6TTFfMm1KdnZnSVM0aU15WWhRdktOZ0dmMkNJZFZyY2dScHhYV1FuNUpDRFh5Y18tTHFsYm5tSkdydzlPOUhmaDFuelhpWnZMUGVKVUsySXRfWDcxWkFFMlcweEM3OEdvQm40dzl0LXVPN1VnUjc5QSIsInRva2VuX3R5cGUiOiJwb3AifQ.PA1qd35sKgz0OTUZGkVrbiduGLUxM0KT9tD19ZkK9XFLk8P0uy-ca_Ku37cUd-2PHV547hx0QI1NJYUMFStoRklxXiZ7a5kFcgPA4TYZT7HRtprq922Ew6tbvw518Xbd_1amtCr9aw_7MfXcTQ61G0JBjVubdfLj1ZXVFmXkZO5vbfrQsZ1JyTzE5IiYtrn_HRwr9Opkpwx02BLiyBPIMzvn3anptP8778JTqjpke1lsoGjeUNUgcYYehldR727QwIPiwwkaSpLyueyVel2IbE8M1041RU7QQ5u6UuTcuakX2tqSmPslZuMAf54zEBNa22JEc3Y_FSKIajfFoYAxoA")

	val headers_16 = Map(
		"Accept" -> "application/trig,application/ld+json;q=0.9,text/html;q=0.8,application/xhtml+xml;q=0.72,application/n-quads;q=0.7,*/*;q=0.1",
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI0M2MzNmJhZjY0ZmQ5MmRiMmZmMWMxOWNkNGE5MDg1ZiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMiLCJleHAiOjE1ODgzNzE0NTQsImlhdCI6MTU4ODM2Nzg1NCwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWtoaVlrVkRaR2hITVZkekluMC5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyeHZZMkZzYUc5emREbzRORFF6SWl3aWMzVmlJam9pYUhSMGNITTZMeTlzYjJOaGJHaHZjM1E2T0RRME15OXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lJME0yTXpObUpoWmpZMFptUTVNbVJpTW1abU1XTXhPV05rTkdFNU1EZzFaaUlzSW1WNGNDSTZNVFU0T1RVM056UTFNeXdpYVdGMElqb3hOVGc0TXpZM09EVXpMQ0pxZEdraU9pSXhPREpoTVdNMk4yUXdZV1U0T1dSaklpd2libTl1WTJVaU9pSnRkRzh0WVhsc2JHZEhkekZDTmtac2FFcDJkVU42V1VSdlpIUkpkVEJwWWtWcE1EVlpkRFZCUnpJMElpd2lZWHB3SWpvaU5ETmpNelppWVdZMk5HWmtPVEprWWpKbVpqRmpNVGxqWkRSaE9UQTROV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUkxVG5obVEySktkMVpQUW5SUmNrVm5PR3RCZWxBM1RFdFZMVWhQWjBReFRFcDZjMFpHZUcxQ05tTXRhVkJQZVVGb01taG9kV0ZxU21WUU5HWTJkMUIyZVc1MU1HVnVUMm80Y1dOTU5USjRNbGREUWpZNFdqZG1jVWxaYkZWeE1HUnJWblpxUlVaNWMwUmxUM05ZZVhOTE5UZFllbFpIVVVjM2QzbERYMTlKTW1FNVltbDZUR3RCTW5KbU9ETjVUbWxaVUVkUmFYSTNjbGRqZWtGV1QwRllVMmd0ZEdwUVIyZFpYMmhrV2pSM1MzSTNiaTFGVEd0RlREQmxWM2hzWVdWSlIzQnFUR3N3TmxsUVVIZGpNbmRsV2xOcmNFVlJWa05HV0RscFNscFlNMnB4ZURoWVRHazFXVVozU1hCV00ybGZZVGhpUzNNeWJEWk9jMUZRZEhGa2EyOUxNRnBQUzFCVFYwdG1lRjgwYlhwUGJETlRjMW8yVTBsdlV6Tk9hR2hCWm1SaWJuRkhRM2xUVjBwck1sRkRXbkJCY0dWM2NURnFWVkpFT1c5TmJrNXlTMk5pUTBaVmRFWnRaamxTWVU5T1VqQjBOMUVpZlgwc0ltRjBYMmhoYzJnaU9pSm5VRWR0UmpGWVJqTlhjbWhVVlhSb1ZVbDRYM0puSW4wLnJVM09HbG5XN0hrdURSVGdYWDNucVJSREdLOHBQWWE4d3VuNUNxaWR1Vk1XSlhlQWNhMzc3UGxBcWgtZEJGOV9wc0JRdjlRZzNmRDNaWU9fQnZXa2pQYmZodXVxcUF3bFh3WFoza1F0YjQ0LUNHLUY1Ny1PendXZ2hHUC1QdG5XdzhoZ19OZW5rUW1iSnpNRnR4alhYd0hURndRamoxczBGcFktdm1wMXRFTmN3M0FDaEdqeklLZFZmS29DMmFfUi1rMkNmY3VubHFIX2tCVjBBWVZ0bmh0eTZVakJYdmU0Q1NMUFN6TTFfMm1KdnZnSVM0aU15WWhRdktOZ0dmMkNJZFZyY2dScHhYV1FuNUpDRFh5Y18tTHFsYm5tSkdydzlPOUhmaDFuelhpWnZMUGVKVUsySXRfWDcxWkFFMlcweEM3OEdvQm40dzl0LXVPN1VnUjc5QSIsInRva2VuX3R5cGUiOiJwb3AifQ.PA1qd35sKgz0OTUZGkVrbiduGLUxM0KT9tD19ZkK9XFLk8P0uy-ca_Ku37cUd-2PHV547hx0QI1NJYUMFStoRklxXiZ7a5kFcgPA4TYZT7HRtprq922Ew6tbvw518Xbd_1amtCr9aw_7MfXcTQ61G0JBjVubdfLj1ZXVFmXkZO5vbfrQsZ1JyTzE5IiYtrn_HRwr9Opkpwx02BLiyBPIMzvn3anptP8778JTqjpke1lsoGjeUNUgcYYehldR727QwIPiwwkaSpLyueyVel2IbE8M1041RU7QQ5u6UuTcuakX2tqSmPslZuMAf54zEBNa22JEc3Y_FSKIajfFoYAxoA")

	val headers_20 = Map(
		"Accept" -> "application/trig,application/ld+json;q=0.9,text/html;q=0.8,application/xhtml+xml;q=0.72,application/n-quads;q=0.7,*/*;q=0.1",
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI0M2MzNmJhZjY0ZmQ5MmRiMmZmMWMxOWNkNGE5MDg1ZiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMiLCJleHAiOjE1ODgzNzE0NTUsImlhdCI6MTU4ODM2Nzg1NSwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWtoaVlrVkRaR2hITVZkekluMC5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyeHZZMkZzYUc5emREbzRORFF6SWl3aWMzVmlJam9pYUhSMGNITTZMeTlzYjJOaGJHaHZjM1E2T0RRME15OXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lJME0yTXpObUpoWmpZMFptUTVNbVJpTW1abU1XTXhPV05rTkdFNU1EZzFaaUlzSW1WNGNDSTZNVFU0T1RVM056UTFNeXdpYVdGMElqb3hOVGc0TXpZM09EVXpMQ0pxZEdraU9pSXhPREpoTVdNMk4yUXdZV1U0T1dSaklpd2libTl1WTJVaU9pSnRkRzh0WVhsc2JHZEhkekZDTmtac2FFcDJkVU42V1VSdlpIUkpkVEJwWWtWcE1EVlpkRFZCUnpJMElpd2lZWHB3SWpvaU5ETmpNelppWVdZMk5HWmtPVEprWWpKbVpqRmpNVGxqWkRSaE9UQTROV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUkxVG5obVEySktkMVpQUW5SUmNrVm5PR3RCZWxBM1RFdFZMVWhQWjBReFRFcDZjMFpHZUcxQ05tTXRhVkJQZVVGb01taG9kV0ZxU21WUU5HWTJkMUIyZVc1MU1HVnVUMm80Y1dOTU5USjRNbGREUWpZNFdqZG1jVWxaYkZWeE1HUnJWblpxUlVaNWMwUmxUM05ZZVhOTE5UZFllbFpIVVVjM2QzbERYMTlKTW1FNVltbDZUR3RCTW5KbU9ETjVUbWxaVUVkUmFYSTNjbGRqZWtGV1QwRllVMmd0ZEdwUVIyZFpYMmhrV2pSM1MzSTNiaTFGVEd0RlREQmxWM2hzWVdWSlIzQnFUR3N3TmxsUVVIZGpNbmRsV2xOcmNFVlJWa05HV0RscFNscFlNMnB4ZURoWVRHazFXVVozU1hCV00ybGZZVGhpUzNNeWJEWk9jMUZRZEhGa2EyOUxNRnBQUzFCVFYwdG1lRjgwYlhwUGJETlRjMW8yVTBsdlV6Tk9hR2hCWm1SaWJuRkhRM2xUVjBwck1sRkRXbkJCY0dWM2NURnFWVkpFT1c5TmJrNXlTMk5pUTBaVmRFWnRaamxTWVU5T1VqQjBOMUVpZlgwc0ltRjBYMmhoYzJnaU9pSm5VRWR0UmpGWVJqTlhjbWhVVlhSb1ZVbDRYM0puSW4wLnJVM09HbG5XN0hrdURSVGdYWDNucVJSREdLOHBQWWE4d3VuNUNxaWR1Vk1XSlhlQWNhMzc3UGxBcWgtZEJGOV9wc0JRdjlRZzNmRDNaWU9fQnZXa2pQYmZodXVxcUF3bFh3WFoza1F0YjQ0LUNHLUY1Ny1PendXZ2hHUC1QdG5XdzhoZ19OZW5rUW1iSnpNRnR4alhYd0hURndRamoxczBGcFktdm1wMXRFTmN3M0FDaEdqeklLZFZmS29DMmFfUi1rMkNmY3VubHFIX2tCVjBBWVZ0bmh0eTZVakJYdmU0Q1NMUFN6TTFfMm1KdnZnSVM0aU15WWhRdktOZ0dmMkNJZFZyY2dScHhYV1FuNUpDRFh5Y18tTHFsYm5tSkdydzlPOUhmaDFuelhpWnZMUGVKVUsySXRfWDcxWkFFMlcweEM3OEdvQm40dzl0LXVPN1VnUjc5QSIsInRva2VuX3R5cGUiOiJwb3AifQ.toTgmAaioudMkwfrptGa0_dwjUK6xTT9vua93SKAptBvgEPZlqVCBPj1dKk3YkXT5VslfOHajn4ONFZuvxAEJ6kETol6NYVHzlfhXV1eEIyEsdjbqlN0D6SdjC8A6T6w3iOz2SJ2bRn6xj4FmYmtJ3gUirahgrFOhHB5ie_LTQ9bV9LFYiTgJqkonCmlAh6O0rOrWa4muuJutmLX94XFaTQHEULheKn9K3exl1bvM66__p4foeUR_yhybBjmKrGeX0j0PmaAyAGwyOIbf5lFPZsoUqLJ7tCuasuUu9w4i_X5rDknCqe4y71mHmG-nhNxRMdRXnUSJTn5KA7rWCAwMA")

	val headers_21 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI0M2MzNmJhZjY0ZmQ5MmRiMmZmMWMxOWNkNGE5MDg1ZiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMiLCJleHAiOjE1ODgzNzE0NTUsImlhdCI6MTU4ODM2Nzg1NSwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWtoaVlrVkRaR2hITVZkekluMC5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyeHZZMkZzYUc5emREbzRORFF6SWl3aWMzVmlJam9pYUhSMGNITTZMeTlzYjJOaGJHaHZjM1E2T0RRME15OXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lJME0yTXpObUpoWmpZMFptUTVNbVJpTW1abU1XTXhPV05rTkdFNU1EZzFaaUlzSW1WNGNDSTZNVFU0T1RVM056UTFNeXdpYVdGMElqb3hOVGc0TXpZM09EVXpMQ0pxZEdraU9pSXhPREpoTVdNMk4yUXdZV1U0T1dSaklpd2libTl1WTJVaU9pSnRkRzh0WVhsc2JHZEhkekZDTmtac2FFcDJkVU42V1VSdlpIUkpkVEJwWWtWcE1EVlpkRFZCUnpJMElpd2lZWHB3SWpvaU5ETmpNelppWVdZMk5HWmtPVEprWWpKbVpqRmpNVGxqWkRSaE9UQTROV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUkxVG5obVEySktkMVpQUW5SUmNrVm5PR3RCZWxBM1RFdFZMVWhQWjBReFRFcDZjMFpHZUcxQ05tTXRhVkJQZVVGb01taG9kV0ZxU21WUU5HWTJkMUIyZVc1MU1HVnVUMm80Y1dOTU5USjRNbGREUWpZNFdqZG1jVWxaYkZWeE1HUnJWblpxUlVaNWMwUmxUM05ZZVhOTE5UZFllbFpIVVVjM2QzbERYMTlKTW1FNVltbDZUR3RCTW5KbU9ETjVUbWxaVUVkUmFYSTNjbGRqZWtGV1QwRllVMmd0ZEdwUVIyZFpYMmhrV2pSM1MzSTNiaTFGVEd0RlREQmxWM2hzWVdWSlIzQnFUR3N3TmxsUVVIZGpNbmRsV2xOcmNFVlJWa05HV0RscFNscFlNMnB4ZURoWVRHazFXVVozU1hCV00ybGZZVGhpUzNNeWJEWk9jMUZRZEhGa2EyOUxNRnBQUzFCVFYwdG1lRjgwYlhwUGJETlRjMW8yVTBsdlV6Tk9hR2hCWm1SaWJuRkhRM2xUVjBwck1sRkRXbkJCY0dWM2NURnFWVkpFT1c5TmJrNXlTMk5pUTBaVmRFWnRaamxTWVU5T1VqQjBOMUVpZlgwc0ltRjBYMmhoYzJnaU9pSm5VRWR0UmpGWVJqTlhjbWhVVlhSb1ZVbDRYM0puSW4wLnJVM09HbG5XN0hrdURSVGdYWDNucVJSREdLOHBQWWE4d3VuNUNxaWR1Vk1XSlhlQWNhMzc3UGxBcWgtZEJGOV9wc0JRdjlRZzNmRDNaWU9fQnZXa2pQYmZodXVxcUF3bFh3WFoza1F0YjQ0LUNHLUY1Ny1PendXZ2hHUC1QdG5XdzhoZ19OZW5rUW1iSnpNRnR4alhYd0hURndRamoxczBGcFktdm1wMXRFTmN3M0FDaEdqeklLZFZmS29DMmFfUi1rMkNmY3VubHFIX2tCVjBBWVZ0bmh0eTZVakJYdmU0Q1NMUFN6TTFfMm1KdnZnSVM0aU15WWhRdktOZ0dmMkNJZFZyY2dScHhYV1FuNUpDRFh5Y18tTHFsYm5tSkdydzlPOUhmaDFuelhpWnZMUGVKVUsySXRfWDcxWkFFMlcweEM3OEdvQm40dzl0LXVPN1VnUjc5QSIsInRva2VuX3R5cGUiOiJwb3AifQ.toTgmAaioudMkwfrptGa0_dwjUK6xTT9vua93SKAptBvgEPZlqVCBPj1dKk3YkXT5VslfOHajn4ONFZuvxAEJ6kETol6NYVHzlfhXV1eEIyEsdjbqlN0D6SdjC8A6T6w3iOz2SJ2bRn6xj4FmYmtJ3gUirahgrFOhHB5ie_LTQ9bV9LFYiTgJqkonCmlAh6O0rOrWa4muuJutmLX94XFaTQHEULheKn9K3exl1bvM66__p4foeUR_yhybBjmKrGeX0j0PmaAyAGwyOIbf5lFPZsoUqLJ7tCuasuUu9w4i_X5rDknCqe4y71mHmG-nhNxRMdRXnUSJTn5KA7rWCAwMA")

	val headers_29 = Map(
		"Accept" -> "text/shex,text/turtle,*/*",
		"Origin" -> "http://localhost:3000")

	val headers_30 = Map(
		"Accept" -> "application/trig,application/ld+json;q=0.9,text/html;q=0.8,application/xhtml+xml;q=0.72,application/n-quads;q=0.7,*/*;q=0.1",
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI0M2MzNmJhZjY0ZmQ5MmRiMmZmMWMxOWNkNGE5MDg1ZiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMiLCJleHAiOjE1ODgzNzE0NTYsImlhdCI6MTU4ODM2Nzg1NiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWtoaVlrVkRaR2hITVZkekluMC5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyeHZZMkZzYUc5emREbzRORFF6SWl3aWMzVmlJam9pYUhSMGNITTZMeTlzYjJOaGJHaHZjM1E2T0RRME15OXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lJME0yTXpObUpoWmpZMFptUTVNbVJpTW1abU1XTXhPV05rTkdFNU1EZzFaaUlzSW1WNGNDSTZNVFU0T1RVM056UTFNeXdpYVdGMElqb3hOVGc0TXpZM09EVXpMQ0pxZEdraU9pSXhPREpoTVdNMk4yUXdZV1U0T1dSaklpd2libTl1WTJVaU9pSnRkRzh0WVhsc2JHZEhkekZDTmtac2FFcDJkVU42V1VSdlpIUkpkVEJwWWtWcE1EVlpkRFZCUnpJMElpd2lZWHB3SWpvaU5ETmpNelppWVdZMk5HWmtPVEprWWpKbVpqRmpNVGxqWkRSaE9UQTROV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUkxVG5obVEySktkMVpQUW5SUmNrVm5PR3RCZWxBM1RFdFZMVWhQWjBReFRFcDZjMFpHZUcxQ05tTXRhVkJQZVVGb01taG9kV0ZxU21WUU5HWTJkMUIyZVc1MU1HVnVUMm80Y1dOTU5USjRNbGREUWpZNFdqZG1jVWxaYkZWeE1HUnJWblpxUlVaNWMwUmxUM05ZZVhOTE5UZFllbFpIVVVjM2QzbERYMTlKTW1FNVltbDZUR3RCTW5KbU9ETjVUbWxaVUVkUmFYSTNjbGRqZWtGV1QwRllVMmd0ZEdwUVIyZFpYMmhrV2pSM1MzSTNiaTFGVEd0RlREQmxWM2hzWVdWSlIzQnFUR3N3TmxsUVVIZGpNbmRsV2xOcmNFVlJWa05HV0RscFNscFlNMnB4ZURoWVRHazFXVVozU1hCV00ybGZZVGhpUzNNeWJEWk9jMUZRZEhGa2EyOUxNRnBQUzFCVFYwdG1lRjgwYlhwUGJETlRjMW8yVTBsdlV6Tk9hR2hCWm1SaWJuRkhRM2xUVjBwck1sRkRXbkJCY0dWM2NURnFWVkpFT1c5TmJrNXlTMk5pUTBaVmRFWnRaamxTWVU5T1VqQjBOMUVpZlgwc0ltRjBYMmhoYzJnaU9pSm5VRWR0UmpGWVJqTlhjbWhVVlhSb1ZVbDRYM0puSW4wLnJVM09HbG5XN0hrdURSVGdYWDNucVJSREdLOHBQWWE4d3VuNUNxaWR1Vk1XSlhlQWNhMzc3UGxBcWgtZEJGOV9wc0JRdjlRZzNmRDNaWU9fQnZXa2pQYmZodXVxcUF3bFh3WFoza1F0YjQ0LUNHLUY1Ny1PendXZ2hHUC1QdG5XdzhoZ19OZW5rUW1iSnpNRnR4alhYd0hURndRamoxczBGcFktdm1wMXRFTmN3M0FDaEdqeklLZFZmS29DMmFfUi1rMkNmY3VubHFIX2tCVjBBWVZ0bmh0eTZVakJYdmU0Q1NMUFN6TTFfMm1KdnZnSVM0aU15WWhRdktOZ0dmMkNJZFZyY2dScHhYV1FuNUpDRFh5Y18tTHFsYm5tSkdydzlPOUhmaDFuelhpWnZMUGVKVUsySXRfWDcxWkFFMlcweEM3OEdvQm40dzl0LXVPN1VnUjc5QSIsInRva2VuX3R5cGUiOiJwb3AifQ.uvK8Zoq4OgXtb0bjBnrBj2ge9IGnel_cfbMI-2-6_A1KSXmOQFq6p2L324c68fI6Ntb7GWOqosWgCZfvBJX7Iy70yw-UjpQtM5y-W1OE0n02WGiOZuJkshPRw8bqOqa0qN94Xv2Ty619HXMP28UPE5P_Wtte3864pA2hfLVncia447FpNYOk1xUjd7YW4vOztddZyPny4irzQkSU5Pk65Ey5vAhAMHmBS0vxOM1BievXUt87z7RHSAhGSOYKBqgVL0Z_D9tDjcT2nP_BrJQTWhQgJa8s_rPNFh_maLARysISOFWD6w6tyyeRnCJJkLOzcGYZPi08--pGAA4qXd9pAw")

	val headers_31 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI0M2MzNmJhZjY0ZmQ5MmRiMmZmMWMxOWNkNGE5MDg1ZiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMiLCJleHAiOjE1ODgzNzE0NTYsImlhdCI6MTU4ODM2Nzg1NiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWtoaVlrVkRaR2hITVZkekluMC5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyeHZZMkZzYUc5emREbzRORFF6SWl3aWMzVmlJam9pYUhSMGNITTZMeTlzYjJOaGJHaHZjM1E2T0RRME15OXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lJME0yTXpObUpoWmpZMFptUTVNbVJpTW1abU1XTXhPV05rTkdFNU1EZzFaaUlzSW1WNGNDSTZNVFU0T1RVM056UTFNeXdpYVdGMElqb3hOVGc0TXpZM09EVXpMQ0pxZEdraU9pSXhPREpoTVdNMk4yUXdZV1U0T1dSaklpd2libTl1WTJVaU9pSnRkRzh0WVhsc2JHZEhkekZDTmtac2FFcDJkVU42V1VSdlpIUkpkVEJwWWtWcE1EVlpkRFZCUnpJMElpd2lZWHB3SWpvaU5ETmpNelppWVdZMk5HWmtPVEprWWpKbVpqRmpNVGxqWkRSaE9UQTROV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUkxVG5obVEySktkMVpQUW5SUmNrVm5PR3RCZWxBM1RFdFZMVWhQWjBReFRFcDZjMFpHZUcxQ05tTXRhVkJQZVVGb01taG9kV0ZxU21WUU5HWTJkMUIyZVc1MU1HVnVUMm80Y1dOTU5USjRNbGREUWpZNFdqZG1jVWxaYkZWeE1HUnJWblpxUlVaNWMwUmxUM05ZZVhOTE5UZFllbFpIVVVjM2QzbERYMTlKTW1FNVltbDZUR3RCTW5KbU9ETjVUbWxaVUVkUmFYSTNjbGRqZWtGV1QwRllVMmd0ZEdwUVIyZFpYMmhrV2pSM1MzSTNiaTFGVEd0RlREQmxWM2hzWVdWSlIzQnFUR3N3TmxsUVVIZGpNbmRsV2xOcmNFVlJWa05HV0RscFNscFlNMnB4ZURoWVRHazFXVVozU1hCV00ybGZZVGhpUzNNeWJEWk9jMUZRZEhGa2EyOUxNRnBQUzFCVFYwdG1lRjgwYlhwUGJETlRjMW8yVTBsdlV6Tk9hR2hCWm1SaWJuRkhRM2xUVjBwck1sRkRXbkJCY0dWM2NURnFWVkpFT1c5TmJrNXlTMk5pUTBaVmRFWnRaamxTWVU5T1VqQjBOMUVpZlgwc0ltRjBYMmhoYzJnaU9pSm5VRWR0UmpGWVJqTlhjbWhVVlhSb1ZVbDRYM0puSW4wLnJVM09HbG5XN0hrdURSVGdYWDNucVJSREdLOHBQWWE4d3VuNUNxaWR1Vk1XSlhlQWNhMzc3UGxBcWgtZEJGOV9wc0JRdjlRZzNmRDNaWU9fQnZXa2pQYmZodXVxcUF3bFh3WFoza1F0YjQ0LUNHLUY1Ny1PendXZ2hHUC1QdG5XdzhoZ19OZW5rUW1iSnpNRnR4alhYd0hURndRamoxczBGcFktdm1wMXRFTmN3M0FDaEdqeklLZFZmS29DMmFfUi1rMkNmY3VubHFIX2tCVjBBWVZ0bmh0eTZVakJYdmU0Q1NMUFN6TTFfMm1KdnZnSVM0aU15WWhRdktOZ0dmMkNJZFZyY2dScHhYV1FuNUpDRFh5Y18tTHFsYm5tSkdydzlPOUhmaDFuelhpWnZMUGVKVUsySXRfWDcxWkFFMlcweEM3OEdvQm40dzl0LXVPN1VnUjc5QSIsInRva2VuX3R5cGUiOiJwb3AifQ.uvK8Zoq4OgXtb0bjBnrBj2ge9IGnel_cfbMI-2-6_A1KSXmOQFq6p2L324c68fI6Ntb7GWOqosWgCZfvBJX7Iy70yw-UjpQtM5y-W1OE0n02WGiOZuJkshPRw8bqOqa0qN94Xv2Ty619HXMP28UPE5P_Wtte3864pA2hfLVncia447FpNYOk1xUjd7YW4vOztddZyPny4irzQkSU5Pk65Ey5vAhAMHmBS0vxOM1BievXUt87z7RHSAhGSOYKBqgVL0Z_D9tDjcT2nP_BrJQTWhQgJa8s_rPNFh_maLARysISOFWD6w6tyyeRnCJJkLOzcGYZPi08--pGAA4qXd9pAw")

    val uri1 = "localhost"
    val uri2 = "https://shexshapes.inrupt.net/public/notifications/core-notification.shex"

	val scn = scenario("LoginTest")
		.exec(http("request_0")
			.get("http://" + uri1 + ":3000/")
			.headers(headers_0)
			.resources(http("request_1")
			.get("http://" + uri1 + ":3000/locales/en-US/translation.json")
			.headers(headers_1),
            http("request_2")
			.get("http://" + uri1 + ":3000/locales/en/translation.json")
			.headers(headers_1),
            http("request_3")
			.get("http://" + uri1 + ":3000/sockjs-node/info?t=1588367840514")
			.headers(headers_3)))
		.pause(2)
		.exec(http("request_4")
			.post("http://" + uri1 + ":3000/sockjs-node/670/k3jighnn/xhr?t=1588367842913")
			.headers(headers_4)
			.resources(http("request_5")
			.post("http://" + uri1 + ":3000/sockjs-node/670/k3jighnn/xhr?t=1588367842924")
			.headers(headers_4)))
		.pause(5)
		.exec(http("request_6")
			.get("/.well-known/openid-configuration")
			.headers(headers_6)
			.resources(http("request_7")
			.get("/jwks")
			.headers(headers_6),
            http("request_8")
			.post("/register")
			.headers(headers_8)
			.body(RawFileBody("viadeGatling/logintest/0008_request.json")),
            http("request_9")
			.get("/authorize?scope=openid&client_id=43c36baf64fd92db2ff1c19cd4a9085f&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvdmlhZGVfZW4yYS8jL3dlbGNvbWUiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoibXRvLWF5bGxnR3cxQjZGbGhKdnVDellEb2R0SXUwaWJFaTA1WXQ1QUcyNCIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiNU54ZkNiSndWT0J0UXJFZzhrQXpQN0xLVS1IT2dEMUxKenNGRnhtQjZjLWlQT3lBaDJoaHVhakplUDRmNndQdnludTBlbk9qOHFjTDUyeDJXQ0I2OFo3ZnFJWWxVcTBka1Z2akVGeXNEZU9zWHlzSzU3WHpWR1FHN3d5Q19fSTJhOWJpekxrQTJyZjgzeU5pWVBHUWlyN3JXY3pBVk9BWFNoLXRqUEdnWV9oZFo0d0tyN24tRUxrRUwwZVd4bGFlSUdwakxrMDZZUFB3YzJ3ZVpTa3BFUVZDRlg5aUpaWDNqcXg4WExpNVlGd0lwVjNpX2E4YktzMmw2TnNRUHRxZGtvSzBaT0tQU1dLZnhfNG16T2wzU3NaNlNJb1MzTmhoQWZkYm5xR0N5U1dKazJRQ1pwQXBld3ExalVSRDlvTW5OcktjYkNGVXRGbWY5UmFPTlIwdDdRIn19.&state=2H-kC8t6JFlSR6XYOmHIhC6xB-MVbyO3I0H_DQfEWuM")
			.headers(headers_9)))
		.pause(5)
		.exec(http("request_10")
			.post("/login/password")
			.headers(headers_10)
			.formParam("username", "testUser")
			.formParam("password", "testPasswd123$")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "43c36baf64fd92db2ff1c19cd4a9085f")
			.formParam("redirect_uri", "http://localhost:3000/viade_en2a/#/welcome")
			.formParam("state", "2H-kC8t6JFlSR6XYOmHIhC6xB-MVbyO3I0H_DQfEWuM")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvdmlhZGVfZW4yYS8jL3dlbGNvbWUiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoibXRvLWF5bGxnR3cxQjZGbGhKdnVDellEb2R0SXUwaWJFaTA1WXQ1QUcyNCIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiNU54ZkNiSndWT0J0UXJFZzhrQXpQN0xLVS1IT2dEMUxKenNGRnhtQjZjLWlQT3lBaDJoaHVhakplUDRmNndQdnludTBlbk9qOHFjTDUyeDJXQ0I2OFo3ZnFJWWxVcTBka1Z2akVGeXNEZU9zWHlzSzU3WHpWR1FHN3d5Q19fSTJhOWJpekxrQTJyZjgzeU5pWVBHUWlyN3JXY3pBVk9BWFNoLXRqUEdnWV9oZFo0d0tyN24tRUxrRUwwZVd4bGFlSUdwakxrMDZZUFB3YzJ3ZVpTa3BFUVZDRlg5aUpaWDNqcXg4WExpNVlGd0lwVjNpX2E4YktzMmw2TnNRUHRxZGtvSzBaT0tQU1dLZnhfNG16T2wzU3NaNlNJb1MzTmhoQWZkYm5xR0N5U1dKazJRQ1pwQXBld3ExalVSRDlvTW5OcktjYkNGVXRGbWY5UmFPTlIwdDdRIn19.")
			.resources(http("request_11")
			.get("http://" + uri1 + ":3000/viade_en2a/locales/en-US/translation.json")
			.headers(headers_1),
            http("request_12")
			.get("http://" + uri1 + ":3000/viade_en2a/locales/en/translation.json")
			.headers(headers_1),
            http("request_13")
			.get("http://" + uri1 + ":3000/sockjs-node/info?t=1588367854339")
			.headers(headers_3),
            http("request_14")
			.get("/profile/card")
			.headers(headers_14),
            http("request_15")
			.get("/profile/card")
			.headers(headers_14),
            http("request_16")
			.get("/profile/card")
			.headers(headers_16),
            http("request_17")
			.get("/viade/")
			.headers(headers_14),
            http("request_18")
			.get("/viade/settings.ttl")
			.headers(headers_14),
            http("request_19")
			.get("/viade/groups/")
			.headers(headers_14),
            http("request_20")
			.get("/viade/settings.ttl")
			.headers(headers_20),
            http("request_21")
			.get("/viade/shared/")
			.headers(headers_21),
            http("request_22")
			.get("/viade/settings.ttl")
			.headers(headers_21),
            http("request_23")
			.get("/viade/inbox/")
			.headers(headers_20),
            http("request_24")
			.get("/viade/settings.ttl.acl")
			.headers(headers_21)
			.check(status.is(404)),
            http("request_25")
			.get("/viade/.acl")
			.headers(headers_21)
			.check(status.is(404)),
            http("request_26")
			.get("/.acl")
			.headers(headers_21),
            http("request_27")
			.get("/.acl")
			.headers(headers_20),
            http("request_28")
			.get("/viade/inbox/")
			.headers(headers_21),
            http("request_29")
			.get(uri2)
			.headers(headers_29),
            http("request_30")
			.get("/inbox/")
			.headers(headers_30),
            http("request_31")
			.get("/viade/groups/")
			.headers(headers_31),
            http("request_32")
			.get("/viade/shared/")
			.headers(headers_31),
            http("request_33")
			.get("/viade/settings.ttl.acl")
			.headers(headers_31)
			.check(status.is(404)),
            http("request_34")
			.get(uri2)
			.headers(headers_29),
            http("request_35")
			.get("/viade/.acl")
			.headers(headers_31)
			.check(status.is(404)),
            http("request_36")
			.get("/.acl")
			.headers(headers_31),
            http("request_37")
			.post("http://" + uri1 + ":3000/sockjs-node/300/ctsqedx3/xhr?t=1588367856822")
			.headers(headers_4),
            http("request_38")
			.post("http://" + uri1 + ":3000/sockjs-node/300/ctsqedx3/xhr?t=1588367856838")
			.headers(headers_4)))

	setUp(scn.inject(atOnceUsers(100))).protocols(httpProtocol)
}