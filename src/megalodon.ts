import StreamListener from './stream_listener'
import WebSocket from './web_socket'
import Response from './response'
import { Application } from './entities/application'
import { Account } from './entities/account'
import { Status } from './entities/status'
import { List } from './entities/list'
import { IdentityProof } from './entities/identity_proof'
import { Relationship } from './entities/relationship'
import { Filter } from './entities/filter'
import { Report } from './entities/report'
import { FeaturedTag } from './entities/featured_tag'
import { Tag } from './entities/tag'
import { Preferences } from './entities/preferences'
import { Context } from './entities/context'
import { Attachment } from './entities/attachment'
import { Poll } from './entities/poll'
import { ScheduledStatus } from './entities/scheduled_status'
import { Conversation } from './entities/conversation'
import { Marker } from './entities/marker'
import { Notification } from './entities/notification'
import { Results } from './entities/results'
import { PushSubscription } from './entities/push_subscription'
import { Token } from './entities/token'

export default interface MegalodonInterface {
  // ======================================
  // apps
  // ======================================
  /**
   * GET /api/v1/apps/verify_credentials
   *
   * @return An Application
   */
  verifyAppCredentials(): Promise<Response<Application>>
  // ======================================
  // accounts
  // ======================================
  /**
   * POST /api/v1/accounts
   *
   * @param username Username for the account.
   * @param email Email for the account.
   * @param password Password for the account.
   * @param agreement Whether the user agrees to the local rules, terms, and policies.
   * @param locale The language of the confirmation email that will be sent
   * @param reason Text that will be reviewed by moderators if registrations require manual approval.
   * @return An account token.
   */
  registerAccount(
    username: string,
    email: string,
    password: string,
    agreement: boolean,
    locale: string,
    reason?: string | null
  ): Promise<Response<Token>>
  /**
   * GET /api/v1/accounts/verify_credentials
   *
   * @return Account.
   */
  verifyAccountCredentials(): Promise<Response<Account>>
  /**
   * PATCH /api/v1/accounts/update_credentials
   *
   * @return An account.
   */
  updateCredentials(
    discoverable?: string | null,
    bot?: boolean | null,
    display_name?: string | null,
    note?: string | null,
    avatar?: string | null,
    header?: string | null,
    locked?: boolean | null,
    source?: {
      privacy?: string
      sensitive?: boolean
      language?: string
    } | null,
    fields_attributes?: Array<{ name: string; value: string }>
  ): Promise<Response<Account>>
  /**
   * GET /api/v1/accounts/:id
   *
   * @param id The account ID.
   * @return An account.
   */
  getAccount(id: string): Promise<Response<Account>>
  /**
   * GET /api/v1/accounts/:id/statuses
   *
   * @param id The account ID.
   * @return Account's statuses.
   */
  getAccountStatuses(id: string): Promise<Response<Array<Status>>>
  /**
   * GET /api/v1/pleroma/accounts/:id/favourites
   *
   * @param id Target account ID.
   * @param limit Max number of results to return.
   * @param max_id Return results order than ID.
   * @param since_id Return results newer than ID.
   * @return Array of statuses.
   */
  getAccountFavourites(
    id: string,
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null
  ): Promise<Response<Array<Status>>>
  /**
   * POST /api/v1/pleroma/accounts/:id/subscribe
   *
   * @param id Target account ID.
   * @return Relationship.
   */
  subscribeAccount(id: string): Promise<Response<Relationship>>
  /**
   * POST /api/v1/pleroma/accounts/:id/unsubscribe
   *
   * @param id Target account ID.
   * @return Relationship.
   */
  unsubscribeAccount(id: string): Promise<Response<Relationship>>
  /**
   * GET /api/v1/accounts/:id/followers
   *
   * @param id The account ID.
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @return The array of accounts.
   */
  getAccountFollowers(
    id: string,
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null
  ): Promise<Response<Array<Account>>>
  /**
   * GET /api/v1/accounts/:id/following
   *
   * @param id The account ID.
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @return The array of accounts.
   */
  getAccountFollowing(
    id: string,
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null
  ): Promise<Response<Array<Account>>>
  /**
   * GET /api/v1/accounts/:id/lists
   *
   * @param id The account ID.
   * @return The array of lists.
   */
  getAccountLists(id: string): Promise<Response<Array<List>>>
  /**
   * GET /api/v1/accounts/:id/identity_proofs
   *
   * @param id The account ID.
   * @return Array of IdentityProof
   */
  getIdentityProof(id: string): Promise<Response<Array<IdentityProof>>>
  /**
   * POST /api/v1/accounts/:id/follow
   *
   * @param id The account ID.
   * @param reblog Receive this account's reblogs in home timeline.
   * @return Relationship
   */
  followAccount(id: string, reblog: boolean): Promise<Response<Relationship>>
  /**
   * POST /api/v1/accounts/:id/unfollow
   *
   * @param id The account ID.
   * @return Relationship
   */
  unfollowAccount(id: string): Promise<Response<Relationship>>
  /**
   * POST /api/v1/accounts/:id/block
   *
   * @param id The account ID.
   * @return Relationship
   */
  blockAccount(id: string): Promise<Response<Relationship>>
  /**
   * POST /api/v1/accounts/:id/unblock
   *
   * @param id The account ID.
   * @return RElationship
   */
  unblockAccount(id: string): Promise<Response<Relationship>>
  /**
   * POST /api/v1/accounts/:id/mute
   *
   * @param id The account ID.
   * @param notifications Mute notifications in addition to statuses.
   * @return Relationship
   */
  muteAccount(id: string, notifications: boolean): Promise<Response<Relationship>>
  /**
   * POST /api/v1/accounts/:id/unmute
   *
   * @param id The account ID.
   * @return Relationship
   */
  unmuteAccount(id: string): Promise<Response<Relationship>>
  /**
   * POST /api/v1/accounts/:id/pin
   *
   * @param id The account ID.
   * @return Relationship
   */
  pinAccount(id: string): Promise<Response<Relationship>>
  /**
   * POST /api/v1/accounts/:id/unpin
   *
   * @param id The account ID.
   * @return Relationship
   */
  unpinAccount(id: string): Promise<Response<Relationship>>
  /**
   * GET /api/v1/accounts/relationships
   *
   * @param ids Array of account IDs.
   * @return Relationship
   */
  getRelationship(ids: Array<string>): Promise<Response<Relationship>>
  /**
   * GET /api/v1/accounts/search
   *
   * @param q Search query.
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @return The array of accounts.
   */
  searchAccount(q: string, limit?: number | null, max_id?: string | null, since_id?: string | null): Promise<Response<Array<Account>>>
  // ======================================
  // accounts/bookmarks
  // ======================================
  /**
   * GET /api/v1/bookmarks
   *
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of statuses.
   */
  getBookmarks(
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null
  ): Promise<Response<Array<Status>>>
  // ======================================
  //  accounts/favourites
  // ======================================
  /**
   * GET /api/v1/favourites
   *
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of statuses.
   */
  getFavourites(limit?: number | null, max_id?: string | null, min_id?: string | null): Promise<Response<Array<Status>>>
  // ======================================
  // accounts/mutes
  // ======================================
  /**
   * GET /api/v1/mutes
   *
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of accounts.
   */
  getMutes(limit?: number | null, max_id?: string | null, min_id?: string | null): Promise<Response<Array<Account>>>
  // ======================================
  // accounts/blocks
  // ======================================
  /**
   * GET /api/v1/blocks
   *
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of accounts.
   */
  getBlocks(limit?: number | null, max_id?: string | null, min_id?: string | null): Promise<Response<Array<Account>>>
  // ======================================
  // accounts/domain_blocks
  // ======================================
  /**
   * GET /api/v1/domain_blocks
   *
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of domain name.
   */
  getDomainBlocks(limit?: number | null, max_id?: string | null, min_id?: string | null): Promise<Response<Array<string>>>
  /**
   * POST/api/v1/domain_blocks
   *
   * @param domain Domain to block.
   */
  blockDomain(domain: string): Promise<Response<{}>>
  /**
   * DELETE /api/v1/domain_blocks
   *
   * @param domain Domain to unblock
   */
  unblockDomain(domain: string): Promise<Response<{}>>
  // ======================================
  // accounts/filters
  // ======================================
  /**
   * GET /api/v1/filters
   *
   * @return Array of filters.
   */
  getFilters(): Promise<Response<Array<Filter>>>
  /**
   * GET /api/v1/filters/:id
   *
   * @param id The filter ID.
   * @return Filter.
   */
  getFilter(id: string): Promise<Response<Filter>>
  /**
   * POST /api/v1/filters
   *
   * @param phrase Text to be filtered.
   * @param context Array of enumerable strings home, notifications, public, thread. At least one context must be specified.
   * @param irreversible Should the server irreversibly drop matching entities from home and notifications?
   * @param whole_word Consider word boundaries?
   * @param expires_in ISO 8601 Datetime for when the filter expires.
   * @return Filter
   */
  createFilter(
    phrase: string,
    context: Array<'home' | 'notifications' | 'public' | 'thread'>,
    irreversible?: boolean | null,
    whole_word?: boolean | null,
    expires_in?: string | null
  ): Promise<Response<Filter>>
  /**
   * PUT /api/v1/filters/:id
   *
   * @param id The filter ID.
   * @param phrase Text to be filtered.
   * @param context Array of enumerable strings home, notifications, public, thread. At least one context must be specified.
   * @param irreversible Should the server irreversibly drop matching entities from home and notifications?
   * @param whole_word Consider word boundaries?
   * @param expires_in ISO 8601 Datetime for when the filter expires.
   * @return Filter
   */
  updateFilter(
    id: string,
    phrase: string,
    context: Array<'home' | 'notifications' | 'public' | 'thread'>,
    irreversible?: boolean | null,
    whole_word?: boolean | null,
    expires_in?: string | null
  ): Promise<Response<Filter>>
  /**
   * DELETE /api/v1/filters/:id
   *
   * @param id The filter ID.
   * @return Removed filter.
   */
  deleteFilter(id: string): Promise<Response<Filter>>
  // ======================================
  // accounts/reports
  // ======================================
  /**
   * POST /api/v1/reports
   *
   * @param account_id Target account ID.
   * @param status_ids Array of Statuses ids to attach to the report.
   * @param comment Reason of the report.
   * @param forward If the account is remote, should the report be forwarded to the remote admin?
   * @return Report
   */
  report(
    account_id: string,
    status_ids?: Array<string> | null,
    comment?: string | null,
    forward?: boolean | null
  ): Promise<Response<Report>>
  // ======================================
  // accounts/follow_requests
  // ======================================
  /**
   * GET /api/v1/follow_requests
   *
   * @param limit Maximum number of results.
   * @return Array of account.
   */
  getFollowRequests(limit?: number): Promise<Response<Array<Account>>>
  /**
   * POST /api/v1/follow_requests/:id/authorize
   *
   * @param id Target account ID.
   * @return Relationship.
   */
  acceptFollowRequest(id: string): Promise<Response<Relationship>>
  /**
   * POST /api/v1/follow_requests/:id/reject
   *
   * @param id Target account ID.
   * @return Relationship.
   */
  rejectFollowRequest(id: string): Promise<Response<Relationship>>
  // ======================================
  // accounts/endorsements
  // ======================================
  /**
   * GET /api/v1/endorsements
   *
   * @param limit Max number of results to return. Defaults to 40.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @return Array of accounts.
   */
  getEndorsements(limit?: number | null, max_id?: string | null, since_id?: string | null): Promise<Response<Array<Account>>>
  // ======================================
  // accounts/featured_tags
  // ======================================
  /**
   * GET /api/v1/featured_tags
   *
   * @return Array of featured tag.
   */
  getFeaturedTags(): Promise<Response<Array<FeaturedTag>>>
  /**
   * POST /api/v1/featured_tags
   *
   * @param name Target hashtag name.
   * @return FeaturedTag.
   */
  createFeaturedTag(name: string): Promise<Response<FeaturedTag>>
  /**
   * DELETE /api/v1/featured_tags/:id
   *
   * @param id Target featured tag id.
   * @return Empty
   */
  deleteFeaturedTag(id: string): Promise<Response<{}>>
  /**
   * GET /api/v1/featured_tags/suggestions
   *
   * @return Array of tag.
   */
  getSuggestedTags(): Promise<Response<Array<Tag>>>
  // ======================================
  // accounts/preferences
  // ======================================
  /**
   * GET /api/v1/preferences
   *
   * @return Preferences.
   */
  getPreferences(): Promise<Response<Preferences>>
  // ======================================
  // accounts/suggestions
  // ======================================
  /**
   * GET /api/v1/suggestions
   *
   * @param limit Maximum number of results.
   * @return Array of accounts.
   */
  getSuggestions(limit?: number): Promise<Response<Array<Account>>>
  // ======================================
  // statuses
  // ======================================
  /**
   * POST /api/v1/statuses
   *
   * @param status Text content of status.
   * @param media_ids Array of Attachment ids.
   * @param poll Poll object.
   * @param in_reply_to_id ID of the status being replied to, if status is a reply.
   * @param sensitive Mark status and attached media as sensitive?
   * @param spoiler_text Text to be shown as a warning or subject before the actual content.
   * @param visibility Visibility of the posted status.
   * @param scheduled_at ISO 8601 Datetime at which to schedule a status.
   * @param language ISO 639 language code for this status.
   * @return Status
   */
  postStatus(
    status: string,
    media_ids: Array<string>,
    poll?: { options: Array<string>; expires_in: number; multiple?: boolean; hide_totals?: boolean } | null,
    in_reply_to_id?: string | null,
    sensitive?: boolean | null,
    spoiler_text?: string | null,
    visibility?: 'public' | 'unlisted' | 'private' | 'direct' | null,
    scheduled_at?: string | null,
    language?: string | null
  ): Promise<Response<Status>>
  /**
   * GET /api/v1/statuses/:id
   *
   * @param id The target status id.
   * @return Status
   */
  getStatus(id: string): Promise<Response<Status>>
  /**
   * DELETE /api/v1/statuses/:id
   *
   * @param id The target status id.
   * @return Status
   */
  deleteStatus(id: string): Promise<Response<Status>>
  /**
   * GET /api/v1/statuses/:id/context
   *
   * Get parent and child statuses.
   * @param id The target status id.
   * @return Context
   */
  getStatusContext(id: string): Promise<Response<Context>>
  /**
   * GET /api/v1/statuses/:id/reblogged_by
   *
   * @param id The target status id.
   * @return Array of accounts.
   */
  getStatusRebloggedBy(id: string): Promise<Response<Array<Account>>>
  /**
   * GET /api/v1/statuses/:id/favourited_by
   *
   * @param id The target status id.
   * @return Array of accounts.
   */
  getStatusFavouritedBy(id: string): Promise<Response<Array<Account>>>
  /**
   * POST /api/v1/statuses/:id/favourite
   *
   * @param id The target status id.
   * @return Status.
   */
  favouriteStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/unfavourite
   *
   * @param id The target status id.
   * @return Status.
   */
  unfavouriteStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/reblog
   *
   * @param id The target status id.
   * @return Status.
   */
  reblogStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/unreblog
   *
   * @param id The target status id.
   * @return Status.
   */
  unreblogStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/bookmark
   *
   * @param id The target status id.
   * @return Status.
   */
  bookmarkStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/unbookmark
   *
   * @param id The target status id.
   * @return Status.
   */
  unbookmarkStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/mute
   *
   * @param id The target status id.
   * @return Status
   */
  muteStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/unmute
   *
   * @param id The target status id.
   * @return Status
   */
  unmuteStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/pin
   * @param id The target status id.
   * @return Status
   */
  pinStatus(id: string): Promise<Response<Status>>
  /**
   * POST /api/v1/statuses/:id/unpin
   *
   * @param id The target status id.
   * @return Status
   */
  unpinStatus(id: string): Promise<Response<Status>>
  // ======================================
  // statuses/media
  // ======================================
  /**
   * POST /api/v1/media
   *
   * @param file The file to be attached, using multipart form data.
   * @param description A plain-text description of the media.
   * @param focus Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0.
   * @return Attachment
   */
  uploadMedia(file: any, description?: string | null, focus?: string | null): Promise<Response<Attachment>>
  /**
   * PUT /api/v1/media/:id
   *
   * @param id Target media ID.
   * @param file The file to be attached, using multipart form data.
   * @param description A plain-text description of the media.
   * @param focus Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0.
   * @return Attachment
   */
  updateMedia(id: string, file?: any, description?: string | null, focus?: string | null): Promise<Response<Attachment>>
  // ======================================
  // statuses/polls
  // ======================================
  /**
   * GET /api/v1/polls/:id
   *
   * @param id Target poll ID.
   * @return Poll
   */
  getPoll(id: string): Promise<Response<Poll>>
  /**
   * POST /api/v1/polls/:id/votes
   *
   * @param id Target poll ID.
   * @param choices Array of own votes containing index for each option (starting from 0).
   * @return Poll
   */
  votePoll(id: string, choices: Array<number>): Promise<Response<Poll>>
  // ======================================
  // statuses/scheduled_statuses
  // ======================================
  /**
   * GET /api/v1/scheduled_statuses
   *
   * @param limit Max number of results to return. Defaults to 20.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of scheduled statuses.
   */
  getScheduledStatuses(
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null
  ): Promise<Response<Array<ScheduledStatus>>>
  /**
   * GET /api/v1/scheduled_statuses/:id
   *
   * @param id Target status ID.
   * @return ScheduledStatus.
   */
  getScheduledStatus(id: string): Promise<Response<ScheduledStatus>>
  /**
   * PUT /api/v1/scheduled_statuses/:id
   *
   * @param id Target scheduled status ID.
   * @param scheduled_at ISO 8601 Datetime at which the status will be published.
   * @return ScheduledStatus.
   */
  scheduleStatus(id: string, scheduled_at?: string | null): Promise<Response<ScheduledStatus>>
  /**
   * DELETE /api/v1/scheduled_statuses/:id
   *
   * @param id Target scheduled status ID.
   */
  cancelScheduledStatus(id: string): Promise<Response<{}>>
  // ======================================
  // timelines
  // ======================================
  /**
   * GET /api/v1/timelines/public
   *
   * @param local Show only local statuses? Defaults to false.
   * @param only_media Show only statuses with media attached? Defaults to false.
   * @param limit Max number of results to return. Defaults to 20.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of statuses.
   */
  getPublicTimeline(
    local?: boolean | null,
    only_media?: boolean | null,
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null
  ): Promise<Response<Array<Status>>>
  /**
   * GET /api/v1/timelines/tag/:hashtag
   *
   * @param hashtag Content of a #hashtag, not including # symbol.
   * @param local Show only local statuses? Defaults to false.
   * @param only_media Show only statuses with media attached? Defaults to false.
   * @param limit Max number of results to return. Defaults to 20.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of statuses.
   */
  getTagTimeline(
    hashtag: string,
    local?: boolean | null,
    only_media?: boolean | null,
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null
  ): Promise<Response<Array<Status>>>
  /**
   * GET /api/v1/timelines/home
   *
   * @param local Show only local statuses? Defaults to false.
   * @param limit Max number of results to return. Defaults to 20.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of statuses.
   */
  getHomeTimeline(
    local?: boolean | null,
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null
  ): Promise<Response<Array<Status>>>
  /**
   * GET /api/v1/timelines/list/:list_id
   *
   * @param list_id Local ID of the list in the database.
   * @param limit Max number of results to return. Defaults to 20.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of statuses.
   */
  getListTimeline(
    list_id: string,
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null
  ): Promise<Response<Array<Status>>>
  // ======================================
  // timelines/conversations
  // ======================================
  /**
   * GET /api/v1/conversations
   *
   * @param limit Max number of results to return. Defaults to 20.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of statuses.
   */
  getConversationTimeline(
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null
  ): Promise<Response<Array<Status>>>
  /**
   * DELETE /api/v1/conversations/:id
   *
   * @param id Target conversation ID.
   */
  deleteConversation(id: string): Promise<Response<{}>>
  /**
   * POST /api/v1/conversations/:id/read
   *
   * @param id Target conversation ID.
   * @return Conversation.
   */
  readConversation(id: string): Promise<Response<Conversation>>
  // ======================================
  // timelines/lists
  // ======================================
  /**
   * GET /api/v1/lists
   *
   * @return Array of lists.
   */
  getLists(): Promise<Response<Array<List>>>
  /**
   * GET /api/v1/lists/:id
   *
   * @param id Target list ID.
   * @return List.
   */
  getList(id: string): Promise<Response<List>>
  /**
   * POST /api/v1/lists
   *
   * @param title List name.
   * @return List.
   */
  createList(title: string): Promise<Response<List>>
  /**
   * PUT /api/v1/lists/:id
   *
   * @param id Target list ID.
   * @param title New list name.
   * @return List.
   */
  updateList(id: string, title: string): Promise<Response<List>>
  /**
   * DELETE /api/v1/lists/:id
   *
   * @param id Target list ID.
   */
  deleteList(id: string): Promise<Response<{}>>
  /**
   * GET /api/v1/lists/:id/accounts
   *
   * @param limit Max number of results to return.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @return Array of accounts.
   */
  getAccountsInList(id: string, limit?: number | null, max_id?: string | null, since_id?: string | null): Promise<Response<Array<Account>>>
  /**
   * POST /api/v1/lists/:id/accounts
   *
   * @param id Target list ID.
   * @param account_ids Array of account IDs to add to the list.
   */
  addAccountsToList(id: string, account_ids: Array<string>): Promise<Response<{}>>
  /**
   * DELETE /api/v1/lists/:id/accounts
   *
   * @param id Target list ID.
   * @param account_ids Array of account IDs to add to the list.
   */
  deleteAccountsFromList(id: string, account_ids: Array<string>): Promise<Response<{}>>
  // ======================================
  // timelines/markers
  // ======================================
  /**
   * GET /api/v1/markers
   *
   * @param timelines Array of timeline names, String enum anyOf home, notifications.
   * @return Marker or empty object.
   */
  getMarker(timeline: Array<'home' | 'notifications'>): Promise<Response<Marker | {}>>
  /**
   * POST /api/v1/markers
   *
   * @param home Marker position of the last read status ID in home timeline.
   * @param notifications Marker position of the last read notification ID in notifications.
   * @return Marker.
   */
  saveMarker(home?: { last_read_id: string } | null, notifications?: { last_read_id: string } | null): Promise<Response<Marker>>
  // ======================================
  // notifications
  // ======================================
  /**
   * GET /api/v1/notifications
   *
   * @param limit Max number of results to return. Defaults to 20.
   * @param max_id Return results older than ID.
   * @param since_id Return results newer than ID.
   * @param min_id Return results immediately newer than ID.
   * @param exclude_type Array of types to exclude.
   * @param account_id Return only notifications received from this account.
   * @return Array of notifications.
   */
  getNotifications(
    limit?: number | null,
    max_id?: string | null,
    since_id?: string | null,
    min_id?: string | null,
    exclude_type?: Array<'follow' | 'favourite' | 'reblog' | 'mention' | 'poll'> | null,
    account_id?: string | null
  ): Promise<Response<Array<Notification>>>
  /**
   * GET /api/v1/notifications/:id
   *
   * @param id Target notification ID.
   * @return Notification.
   */
  getNotification(id: string): Promise<Response<Notification>>
  /**
   * POST /api/v1/notifications/clear
   */
  dismissNotifications(): Promise<Response<{}>>
  /**
   * POST /api/v1/notifications/:id/dismiss
   *
   * @param id Target notification ID.
   */
  dismissNotification(id: string): Promise<Response<{}>>
  // ======================================
  // notifications/push
  // ======================================
  /**
   * POST /api/v1/push/subscription
   *
   * @param subscription[endpoint] Endpoint URL that is called when a notification event occurs.
   * @param subscription[keys][p256dh] User agent public key. Base64 encoded string of public key of ECDH key using prime256v1 curve.
   * @param subscription[keys] Auth secret. Base64 encoded string of 16 bytes of random data.
   * @param data[alerts][follow] Receive follow notifications?
   * @param data[alerts][favourite] Receive favourite notifications?
   * @param data[alerts][reblog] Receive reblog notifictaions?
   * @param data[alerts][mention] Receive mention notifications?
   * @param data[alerts][poll] Receive poll notifications?
   * @return PushSubscription.
   */
  subscribePushNotification(
    subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
    data?: { alerts: { follow?: boolean; favourite?: boolean; reblog?: boolean; mention?: boolean; poll?: boolean } } | null
  ): Promise<Response<PushSubscription>>
  /**
   * GET /api/v1/push/subscription
   *
   * @return PushSubscription.
   */
  getPushSubscription(): Promise<Response<PushSubscription>>
  /**
   * PUT /api/v1/push/subscription
   *
   * @param data[alerts][follow] Receive follow notifications?
   * @param data[alerts][favourite] Receive favourite notifications?
   * @param data[alerts][reblog] Receive reblog notifictaions?
   * @param data[alerts][mention] Receive mention notifications?
   * @param data[alerts][poll] Receive poll notifications?
   * @return PushSubscription.
   */
  updatePushSubscription(
    data?: { alerts: { follow?: boolean; favourite?: boolean; reblog?: boolean; mention?: boolean; poll?: boolean } } | null
  ): Promise<Response<PushSubscription>>
  /**
   * DELETE /api/v1/push/subscription
   */
  deletePushSubscription(): Promise<Response<{}>>
  // ======================================
  // search
  // ======================================
  /**
   * GET /api/v2/search
   *
   * @param q The search query.
   * @param type Enum of search target.
   * @param limit Maximum number of results to load, per type. Defaults to 20. Max 40.
   * @param max_id Return results older than this id.
   * @param min_id Return results immediately newer than this id.
   * @param resolve Attempt WebFinger lookup. Defaults to false.
   * @param following Only include accounts that the user is following. Defaults to false.
   * @param account_id If provided, statuses returned will be authored only by this account.
   * @param exclude_unreviewed Filter out unreviewed tags? Defaults to false.
   * @return Results.
   */
  search(
    q: string,
    type: 'accounts' | 'hashtags' | 'statuses',
    limit?: number | null,
    max_id?: string | null,
    min_id?: string | null,
    resolve?: boolean | null,
    offset?: number | null,
    following?: boolean | null,
    account_id?: string | null,
    exclude_unreviewed?: boolean | null
  ): Promise<Response<Results>>
  userStream(): StreamListener
  publicStream(): StreamListener
  localStream(): StreamListener
  tagStream(tag: string): StreamListener
  listStream(list_id: string): StreamListener
  directStream(): StreamListener
  userSocket(): WebSocket
  publicSocket(): WebSocket
  localSocket(): WebSocket
  tagSocket(tag: string): WebSocket
  listSocket(list_id: string): WebSocket
  directSocket(): WebSocket
}

export class NoImplementedError extends Error {
  constructor(err?: string) {
    super(err)

    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
