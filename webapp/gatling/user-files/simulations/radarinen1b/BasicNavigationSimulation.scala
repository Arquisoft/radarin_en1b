package radarinen1b

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class BasicNavigationSimulation extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:3000")
		.inferHtmlResources()
		.acceptHeader("image/webp,*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map("Accept" -> "*/*")

	val headers_3 = Map(
		"Accept" -> "*/*",
		"Content-Type" -> "application/ocsp-request")

	val headers_14 = Map("If-None-Match" -> """W/"10b792-LlqJipgBcwtsW905BshEKhl3pug"""")

	val headers_15 = Map("If-None-Match" -> """W/"15d594-f6b/sAkRE5OAzBlriZD4xPWWYjY"""")

    val uri1 = "http://ciscobinary.openh264.org/openh264-win64-2e1774ab6dc6c43debb0b5b628bdf122a391d521.zip"
    val uri2 = "http://ocsp.digicert.com"
    val uri4 = "http://r3.o.lencr.org"
    val uri5 = "http://ocsp.pki.goog/gts1o1core"

	val scn = scenario("RecordedSimulation")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0))
		.pause(4)
		.exec(http("request_1")
			.get("/static/js/bundle.js")
			.headers(headers_1)
			.resources(http("request_2")
			.get("/static/js/main.chunk.js")
			.headers(headers_1),
            http("request_3")
			.post(uri5)
			.headers(headers_3)
			.body(RawFileBody("radarinen1b/recordedsimulation/0003_request.dat")),
            http("request_4")
			.get("/static/js/vendors~main.chunk.js")
			.headers(headers_1),
            http("request_5")
			.get("/logo192.png"),
            http("request_6")
			.get("/icon.png"),
            http("request_7")
			.get("/static/media/back.87224eb2.jpg"),
            http("request_8")
			.get("/static/media/radarin-logo.dd427d33.png")))
		.pause(3)
		.exec(http("request_9")
			.get("/static/media/inrupt.4e843389.png")
			.resources(http("request_10")
			.get("/static/media/solidcommunity.e8e42a2a.png")))
		.pause(3)
		.exec(http("request_11")
			.post(uri4 + "/")
			.headers(headers_3)
			.body(RawFileBody("radarinen1b/recordedsimulation/0011_request.dat"))
			.resources(http("request_12")
			.post(uri4 + "/")
			.headers(headers_3)
			.body(RawFileBody("radarinen1b/recordedsimulation/0012_request.dat"))))
		.pause(14)
		.exec(http("request_13")
			.get("/?code=5f9d464493ebb011f41c5dd08275c83e&state=aaf8503bbc7448ad8a04e9dc78aeccf1")
			.headers(headers_0)
			.resources(http("request_14")
			.get("/static/media/back.87224eb2.jpg")
			.headers(headers_14),
            http("request_15")
			.get("/static/media/radarin-logo.dd427d33.png")
			.headers(headers_15)))
		.pause(25)
		.exec(http("request_16")
			.get("/static/media/alex.8b64e8b7.jpg")
			.resources(http("request_17")
			.get("/static/media/Alberto.7b983abe.jpg"),
            http("request_18")
			.get("/static/media/Daniel.2fc532a5.jpg"),
            http("request_19")
			.get("/static/media/Hector.6884f011.jpg"),
            http("request_20")
			.get("/static/media/Javier.d9e42f5c.jpg"),
            http("request_21")
			.get("/static/media/luis.84681b68.jpg")))
		.pause(13)
		.exec(http("request_22")
			.post(uri2 + "/")
			.headers(headers_3)
			.body(RawFileBody("radarinen1b/recordedsimulation/0022_request.dat"))
			.resources(http("request_23")
			.post(uri2 + "/")
			.headers(headers_3)
			.body(RawFileBody("radarinen1b/recordedsimulation/0023_request.dat")),
            http("request_24")
			.post(uri2 + "/")
			.headers(headers_3)
			.body(RawFileBody("radarinen1b/recordedsimulation/0024_request.dat")),
            http("request_25")
			.post(uri2 + "/")
			.headers(headers_3)
			.body(RawFileBody("radarinen1b/recordedsimulation/0025_request.dat")),
            http("request_26")
			.get(uri1)
			.headers(headers_1)
			.check(status.is(503))))

	setUp(scn.inject(atOnceUsers(100))).protocols(httpProtocol)
}