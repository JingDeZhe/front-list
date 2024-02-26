export class TreeNode {
  val: number
  left: TreeNode | null = null
  right: TreeNode | null = null
  constructor(val: number) {
    this.val = val
  }

  toString(type = 'pre'): string {
    return type === 'pre'
      ? `${this.val},${this.left ? this.left.toString() : null},${
          this.right ? this.right.toString() : null
        }`
      : type === 'in'
      ? `${this.left ? this.left.toString() : null},${this.val},${
          this.right ? this.right.toString() : null
        }`
      : `${this.left ? this.left.toString() : null},${this.right ? this.right.toString() : null}${
          this.val
        },`
  }
}
