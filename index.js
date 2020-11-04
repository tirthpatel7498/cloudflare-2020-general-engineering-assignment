const Router = require('./router')
const link_array = [
    {"name": "Google", "url": "https://www.google.com"},
    {"name": "Facebook", "url": "https://www.facebook.com"},
    {"name": "LinkedIn", "url": "https://www.linkedin.com"}
]

social_links = [
  {"name": "lyft", "url": "https://www.lyft.com", "svg": "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>Lyft icon</title><path d=\"M24 11.122v-3.512h-1.253c-0.524-2.76-3.424-4.575-6.34-3.483-1.624 0.606-2.944 2.546-2.944 4.282v7.981h0.14c0.003 0 0.003 0 0.006 0s0.003 0 0.006 0c0.904-0.038 1.75-0.421 2.38-1.077 0.632-0.659 0.981-1.522 0.981-2.432h1.463v-3.515h-1.463v-0.966c0-0.375 0.199-0.726 0.527-0.907 0.899-0.501 1.815 0.143 1.815 0.995v3.22c0 1.273 0.48 2.456 1.352 3.331 0.834 0.834 1.964 1.314 3.179 1.352 0 0 0.003 0 0.003 0s0 0 0.003 0v0h0.143v-3.512c0 0 0 0 0 0-0.656-0.003-1.171-0.53-1.171-1.171v-0.585zM3.512 13.463v-9.366h-3.512v8.78c0 2.412 1.592 3.512 3.073 3.512v0c0.442 0 0.884-0.102 1.279-0.287 0.059-0.026 0.152-0.085 0.152-0.085s-0.088-0.094-0.126-0.135c-0.562-0.641-0.866-1.472-0.866-2.42zM9.073 12.375c0 0.146-0.070 0.287-0.19 0.369-0.471 0.331-0.981-0.003-0.981-0.451v-4.683h-3.512v5.854c0 1.613 1.314 2.927 2.927 2.927 0.697 0 1.373-0.249 1.902-0.702-0.056 0.433-0.293 0.79-0.691 1.039-0.372 0.234-0.858 0.357-1.402 0.357-0.562 0-1.133-0.132-1.651-0.38 0 0-0.094-0.044-0.211-0.111v3.12c0.781 0.316 1.639 0.483 2.467 0.483 1.311 0 2.508-0.41 3.372-1.156 0.969-0.834 1.481-2.055 1.481-3.527v-7.902h-3.512z\"/></svg>"},
  {"name": "Slack", "url": "https://www.slack.com", "svg": "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>Slack icon</title><path d=\"M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z\"/></svg>"}
]

const url = "https://static-links-page.signalnerve.workers.dev"


addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function json_handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(link_array)
    return new Response(body, init)
}

async function gatherResponse(response) {
    const { headers } = response
    const contentType = headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      return JSON.stringify(await response.json())
    }
    else if (contentType.includes("application/text")) {
      return await response.text()
    }
    else if (contentType.includes("text/html")) {
      return await response.text()
    }
    else {
      return await response.text()
    }
}

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  element(element) {
    const id = element.getAttribute('id')
    if(id == 'social'){
      element.removeAttribute('style')
      const a1 = "<a href=\"" + this.links[0].url + "\">" + this.links[0].svg + "</a>"
      element.append(a1, { html: true })
      const a2 = "<a href=\"" + this.links[1].url +"\">" + this.links[1].svg + "</a>"
      element.append(a2, { html: true })
    }else if(id == 'links'){
      const a1 = "<a href=\"" + this.links[0].url +"\">" + this.links[0].name + "</a>"
      element.append(a1, { html: true })
      const a2 = "<a href=\"" + this.links[1].url +"\">" + this.links[1].name + "</a>"
      element.append(a2, { html: true })
      const a3 = "<a href=\"" + this.links[2].url +"\">" + this.links[2].name + "</a>"
      element.append(a3, { html: true })
    }
    
  }
}

class AttributeTransformer {
  element(element, content) {
    if(element.tagName == 'div'){
      element.removeAttribute('style')
    }else if(element.tagName == 'img'){
      element.setAttribute('src', 'https://blog.hubspot.com/hubfs/image8-2.jpg')
    }else if(element.tagName == 'h1'){
      element.append('Tirth Patel')
    }else if(element.tagName == 'title'){
      element.setInnerContent('Tirth Patel')
    }else if(element.tagName == 'body'){
      element.setAttribute('style', 'background-color: green')
    }
    
  }
}

function formatResponse(response) {
  let ret = response
  
  ret = new HTMLRewriter().on('div#links', new LinksTransformer(link_array)).transform(ret)
  ret = new HTMLRewriter().on('div#profile', new AttributeTransformer()).transform(ret)
  ret = new HTMLRewriter().on('img#avatar', new AttributeTransformer()).transform(ret)
  ret = new HTMLRewriter().on('h1#name', new AttributeTransformer()).transform(ret)
  ret = new HTMLRewriter().on('title', new AttributeTransformer()).transform(ret)
  ret = new HTMLRewriter().on('body', new AttributeTransformer()).transform(ret)
  ret = new HTMLRewriter().on('div#social', new LinksTransformer(social_links)).transform(ret)
  return ret
}

async function html_request(request){
    const init = {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      }
      // fetch the response
      const response = await fetch(url, init)
      const final_response = formatResponse(response);
      const results = await gatherResponse(final_response)
      return new Response(results, init)
}
async function handleRequest(request) {
    const r = new Router()
    const link = new URL(request.url)
    let e = link.pathname.split('/').filter(n => n)
    if(e == 'links'){
      return json_handler(request)
    }else{
      return html_request(request)
    }
}