export abstract class Entity<T> {
  private _id: number
  private static _currentId = 0
  protected props: T

  constructor(props: T, id?: number) {
    this.props = props
    this._id = id ?? Entity.generateId()
  }

  private static generateId(): number {
    return ++Entity._currentId
  }

  get id() {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }
}
