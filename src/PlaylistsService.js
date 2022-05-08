const { Pool } = require('pg/lib');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
    this._tableName = 'playlists';
  }

  async getPlaylists(userId) {
    const query = {
      text: `SELECT id, name
      FROM ${this._tableName}
      WHERE owner = $1`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

module.exports = PlaylistsService;
