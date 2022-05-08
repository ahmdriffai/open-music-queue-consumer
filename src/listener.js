const MailSender = require('./MailSender');
const PlaylistsService = require('./PlaylistsService');
const SongsService = require('./SongsService');

class Listener {
  constructor() {
    this._playlistsService = new PlaylistsService();
    this._songsService = new SongsService();
    this._mailSender = new MailSender();

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getPlaylists(userId);

      const songs = await this._songsService.getSongByPlaylsitId(playlist.id);

      const content = {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          songs,
        },
      };

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(content));

      console.log(result);
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
