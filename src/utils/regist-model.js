/**
 * 注册 model
 *
 * @param {Object} app 实例
 * @param {Object} model model
 * @param {Object} cached 缓存对象
 */
export function registerModel(app, model, cached) {
  if (cached[model.namespace]) return;
  app.model(model);
  cached[model.namespace] = 1;
}

export default registerModel;
