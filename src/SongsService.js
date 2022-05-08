const { Pool } = require('pg/lib');

class SongsService {
  constructor() {
    this._pool = new Pool();
    this._tableName = 'songs';
  }

  async getSongByPlaylsitId(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer 
      FROM ${this._tableName} as s 
      LEFT JOIN playlist_songs as ps
      ON s.id = ps.song_id 
      JOIN playlists as p 
      ON ps.playlist_id = p.id 
      WHERE p.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = SongsService;
