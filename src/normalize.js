import { has } from 'lodash/fp'
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const inspectObject = async ({
  apiURL,
  store,
  cache,
  createNode,
  touchNode,
  auth,
  field
}) => {
  if (field !== null && has('url', field)) {
    let fileNodeID

    if (!fileNodeID) {
      try {
        // full media url
        const source_url = `${field.url.startsWith('http') ? '' : apiURL}${field.url}`
        const fileNode = await createRemoteFileNode({
          url: source_url,
          store,
          cache,
          createNode,
          auth,
        })

        if (fileNode) {
          fileNodeID = fileNode.id
        }
      } catch (e) {
        // Ignore
      }
    }
    if (fileNodeID) {
      field.remoteImage___NODE = fileNodeID
    }
  } else if (field !== null && typeof field === 'object') {
    await extractFields(apiURL, store, cache, createNode, touchNode, auth, field)
  }
}

const extractFields = async (apiURL, store, cache, createNode, touchNode, auth, item) => {
  for (const key of Object.keys(item)) {
    const field = item[key]
    if (Array.isArray(field)) {
      await Promise.all(field.map(async f => {
        await inspectObject({
          apiURL,
          store,
          cache,
          createNode,
          touchNode,
          auth,
          field: f
        })
      }))
    } else {
      await inspectObject({
        apiURL,
        store,
        cache,
        createNode,
        touchNode,
        auth,
        field
      })
    }
  }
}

// Downloads media from image type fields
exports.downloadMediaFiles = async ({ entities, apiURL, store, cache, createNode, touchNode, jwtToken: auth }) =>
  Promise.all(
    entities.map(async entity => {
      for (let item of entity) {
        // loop item over fields
        await extractFields(apiURL, store, cache, createNode, touchNode, auth, item)
      }
      return entity
    })
  )
