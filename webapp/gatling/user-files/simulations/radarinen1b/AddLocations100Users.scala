package radarinen1b

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AddLocations100Users extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:3000")
		.inferHtmlResources()
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0")

	val headers_0 = Map("Content-Type" -> "application/ocsp-request")

	val headers_2 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"If-None-Match" -> """W/"a7e-OS8tzhwUafyp1idv65EQlGr3kxg"""",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_4 = Map("If-None-Match" -> """W/"9777-xD1pFPZeptLrJgaRVlHWJab7sJE"""")

	val headers_7 = Map("If-None-Match" -> """W/"a64fc9-YVFPz0Jqh5ELrMuUOyawGGN/nes"""")

	val headers_8 = Map("Accept" -> "image/webp,*/*")

	val headers_12 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_13 = Map(
		"Accept" -> "image/webp,*/*",
		"If-None-Match" -> """W/"20552-DVaKIB3lpRBu0KaOm5UDfmACDXw"""")

	val headers_14 = Map(
		"Accept" -> "image/webp,*/*",
		"If-None-Match" -> """W/"e98-UecmqNbr5LjAzMyhfuSSGtS/SZ4"""")

    val uri1 = "http://ocsp.digicert.com"
    val uri3 = "http://r3.o.lencr.org"
    val uri4 = "http://ocsp.pki.goog/gts1o1core"

	val scn = scenario("AddLocations100Users")
		.exec(http("request_0")
			.post(uri4)
			.headers(headers_0)
			.body(RawFileBody("radarinen1b/addlocations100users/0000_request.dat"))
			.resources(http("request_1")
			.post(uri4)
			.headers(headers_0)
			.body(RawFileBody("radarinen1b/addlocations100users/0001_request.dat")),
            http("request_2")
			.get("/")
			.headers(headers_2),
            http("request_3")
			.post(uri4)
			.headers(headers_0)
			.body(RawFileBody("radarinen1b/addlocations100users/0003_request.dat")),
            http("request_4")
			.get("/static/js/bundle.js")
			.headers(headers_4),
            http("request_5")
			.get("/static/js/main.chunk.js"),
            http("request_6")
			.post(uri1 + "/")
			.headers(headers_0)
			.body(RawFileBody("radarinen1b/addlocations100users/0006_request.dat")),
            http("request_7")
			.get("/static/js/vendors~main.chunk.js")
			.headers(headers_7)))
		.pause(1)
		.exec(http("request_8")
			.get("/static/media/background.f29d6d64.jpg")
			.headers(headers_8)
			.resources(http("request_9")
			.get("/static/media/radar.76907a3f.svg")
			.headers(headers_8),
            http("request_10")
			.get("/favicon.ico")
			.headers(headers_8)))
		.pause(3)
		.exec(http("request_11")
			.post(uri3 + "/")
			.headers(headers_0)
			.body(RawFileBody("radarinen1b/addlocations100users/0011_request.dat")))
		.pause(42)
		.exec(http("request_12")
			.get("/?code=c311b93e85132d0f10566475a5d01ad4&state=405bf079b9634d5aa0004ccd908f31bb")
			.headers(headers_12)
			.resources(http("request_13")
			.get("/static/media/background.f29d6d64.jpg")
			.headers(headers_13),
            http("request_14")
			.get("/static/media/radar.76907a3f.svg")
			.headers(headers_14)))

	setUp(scn.inject(atOnceUsers(100))).protocols(httpProtocol)
}