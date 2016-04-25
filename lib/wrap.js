export function reply (fn, ...args) {
  return async (ctx) => {
    const isPost = ctx.method === 'POST'

    try {
      ctx.body = await fn.apply(ctx, [ ctx, ...args ])
      ctx.status = isPost ? 201 : 200
    } catch (err) {
      console.error(err)
      const code = isPost ? 422 : 412
      ctx.throw(code, err)
    }
  }
}

export function test (fn) {
  return async () => {
    try {
      await fn
    } catch (err) {
      throw err
    }
  }
}
