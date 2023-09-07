export const codeJs = `
/* 回溯算法：N 皇后 */
function backtrack(row, n, state, res, cols, diags1, diags2) {
    // 当放置完所有行时，记录解
    if (row === n) {
        res.push(state.map((row) => row.slice()));
        return;
    }
    // 遍历所有列
    for (let col = 0; col < n; col++) {
        // 计算该格子对应的主对角线和副对角线
        const diag1 = row - col + n - 1;
        const diag2 = row + col;
        // 剪枝：不允许该格子所在列、主对角线、副对角线存在皇后
        if (!cols[col] && !diags1[diag1] && !diags2[diag2]) {
            // 尝试：将皇后放置在该格子
            state[row][col] = 'Q';
            cols[col] = diags1[diag1] = diags2[diag2] = true;
            // 放置下一行
            backtrack(row + 1, n, state, res, cols, diags1, diags2);
            // 回退：将该格子恢复为空位
            state[row][col] = '#';
            cols[col] = diags1[diag1] = diags2[diag2] = false;
        }
    }
}

/* 求解 N 皇后 */
function nQueens(n) {
    // 初始化 n*n 大小的棋盘，其中 'Q' 代表皇后，'#' 代表空位
    const state = Array.from({ length: n }, () => Array(n).fill('#'));
    const cols = Array(n).fill(false); // 记录列是否有皇后
    const diags1 = Array(2 * n - 1).fill(false); // 记录主对角线是否有皇后
    const diags2 = Array(2 * n - 1).fill(false); // 记录副对角线是否有皇后
    const res = [];

    backtrack(0, n, state, res, cols, diags1, diags2);
    return res;
}
`

export const codeCpp = `
/* 回溯算法：N 皇后 */
void backtrack(int row, int n, vector<vector<string>> &state, vector<vector<vector<string>>> &res, vector<bool> &cols,
               vector<bool> &diags1, vector<bool> &diags2) {
    // 当放置完所有行时，记录解
    if (row == n) {
        res.push_back(state);
        return;
    }
    // 遍历所有列
    for (int col = 0; col < n; col++) {
        // 计算该格子对应的主对角线和副对角线
        int diag1 = row - col + n - 1;
        int diag2 = row + col;
        // 剪枝：不允许该格子所在列、主对角线、副对角线存在皇后
        if (!cols[col] && !diags1[diag1] && !diags2[diag2]) {
            // 尝试：将皇后放置在该格子
            state[row][col] = "Q";
            cols[col] = diags1[diag1] = diags2[diag2] = true;
            // 放置下一行
            backtrack(row + 1, n, state, res, cols, diags1, diags2);
            // 回退：将该格子恢复为空位
            state[row][col] = "#";
            cols[col] = diags1[diag1] = diags2[diag2] = false;
        }
    }
}

/* 求解 N 皇后 */
vector<vector<vector<string>>> nQueens(int n) {
    // 初始化 n*n 大小的棋盘，其中 'Q' 代表皇后，'#' 代表空位
    vector<vector<string>> state(n, vector<string>(n, "#"));
    vector<bool> cols(n, false);           // 记录列是否有皇后
    vector<bool> diags1(2 * n - 1, false); // 记录主对角线是否有皇后
    vector<bool> diags2(2 * n - 1, false); // 记录副对角线是否有皇后
    vector<vector<vector<string>>> res;

    backtrack(0, n, state, res, cols, diags1, diags2);

    return res;
}
`
