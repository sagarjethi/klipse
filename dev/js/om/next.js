// Compiled by ClojureScript 1.9.36 {:static-fns true, :optimize-constants true}
goog.provide('om.next');
goog.require('cljs.core');
goog.require('goog.log');
goog.require('goog.string');
goog.require('om.next.cache');
goog.require('clojure.zip');
goog.require('om.next.protocols');
goog.require('om.next.impl.parser');
goog.require('goog.object');
goog.require('clojure.walk');
goog.require('om.util');
goog.require('om.tempid');
goog.require('om.transit');
goog.require('goog.debug.Console');
if(typeof om.next._STAR_logger_STAR_ !== 'undefined'){
} else {
om.next._STAR_logger_STAR_ = ((goog.DEBUG)?(function (){
(new goog.debug.Console()).setCapturing(true);

return goog.log.getLogger("om.next");
})()
:null);
}
om.next.roots = (function (){var G__22009 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__22009) : cljs.core.atom.call(null,G__22009));
})();
om.next._STAR_raf_STAR_ = null;
om.next._STAR_reconciler_STAR_ = null;
om.next._STAR_parent_STAR_ = null;
om.next._STAR_shared_STAR_ = null;
om.next._STAR_instrument_STAR_ = null;
om.next._STAR_depth_STAR_ = (0);
om.next.nil_or_map_QMARK_ = (function om$next$nil_or_map_QMARK_(x){
return ((x == null)) || (cljs.core.map_QMARK_(x));
});
/**
 * Given a query expression return its key.
 */
om.next.expr__GT_key = (function om$next$expr__GT_key(expr){
if((expr instanceof cljs.core.Keyword)){
return expr;
} else {
if(cljs.core.map_QMARK_(expr)){
return cljs.core.ffirst(expr);
} else {
if(cljs.core.seq_QMARK_(expr)){
var expr_SINGLEQUOTE_ = cljs.core.first(expr);
if(cljs.core.map_QMARK_(expr_SINGLEQUOTE_)){
return cljs.core.ffirst(expr_SINGLEQUOTE_);
} else {
return null;
}
} else {
if(om.util.ident_QMARK_(expr)){
var G__22022 = expr;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$_,cljs.core.second(expr))){
return cljs.core.first(G__22022);
} else {
return G__22022;
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Invalid query expr "),cljs.core.str(expr)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$error_SLASH_invalid_DASH_expression], null));

}
}
}
}
});
/**
 * Return a zipper on a query expression.
 */
om.next.query_zip = (function om$next$query_zip(root){
return clojure.zip.zipper((function (p1__22025_SHARP_){
return (cljs.core.vector_QMARK_(p1__22025_SHARP_)) || (cljs.core.map_QMARK_(p1__22025_SHARP_)) || (cljs.core.seq_QMARK_(p1__22025_SHARP_));
}),cljs.core.seq,(function (node,children){
var ret = ((cljs.core.vector_QMARK_(node))?cljs.core.vec(children):((cljs.core.map_QMARK_(node))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,children):((cljs.core.seq_QMARK_(node))?children:null)));
return cljs.core.with_meta(ret,cljs.core.meta(node));
}),root);
});
/**
 * Move from the current zipper location to the specified key. loc must be a
 * hash map node.
 */
om.next.move_to_key = (function om$next$move_to_key(loc,k){
var loc__$1 = clojure.zip.down(loc);
while(true){
var node = clojure.zip.node(loc__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.first(node))){
return clojure.zip.right(clojure.zip.down(loc__$1));
} else {
var G__22032 = clojure.zip.right(loc__$1);
loc__$1 = G__22032;
continue;
}
break;
}
});
/**
 * Given a query and a path into a query return a zipper focused at the location
 * specified by the path. This location can be replaced to customize / alter
 * the query.
 */
om.next.query_template = (function om$next$query_template(query,path){
var query_template_STAR_ = (function om$next$query_template_$_query_template_STAR_(loc,path__$1){
while(true){
if(cljs.core.empty_QMARK_(path__$1)){
return loc;
} else {
var node = clojure.zip.node(loc);
if(cljs.core.vector_QMARK_(node)){
var G__22077 = clojure.zip.down(loc);
var G__22078 = path__$1;
loc = G__22077;
path__$1 = G__22078;
continue;
} else {
var vec__22073 = path__$1;
var seq__22074 = cljs.core.seq(vec__22073);
var first__22075 = cljs.core.first(seq__22074);
var seq__22074__$1 = cljs.core.next(seq__22074);
var k = first__22075;
var ks = seq__22074__$1;
var k_SINGLEQUOTE_ = om.next.expr__GT_key(node);
if(cljs.core.keyword_identical_QMARK_(k,k_SINGLEQUOTE_)){
if((cljs.core.map_QMARK_(node)) || ((cljs.core.seq_QMARK_(node)) && (cljs.core.map_QMARK_(cljs.core.first(node))))){
var loc_SINGLEQUOTE_ = om.next.move_to_key((function (){var G__22076 = loc;
if(cljs.core.seq_QMARK_(node)){
return clojure.zip.down(G__22076);
} else {
return G__22076;
}
})(),k);
var node_SINGLEQUOTE_ = clojure.zip.node(loc_SINGLEQUOTE_);
if(cljs.core.map_QMARK_(node_SINGLEQUOTE_)){
if(cljs.core.seq(ks)){
var G__22081 = clojure.zip.replace(loc_SINGLEQUOTE_,clojure.zip.node(om.next.move_to_key(loc_SINGLEQUOTE_,cljs.core.first(ks))));
var G__22082 = cljs.core.next(ks);
loc = G__22081;
path__$1 = G__22082;
continue;
} else {
return loc_SINGLEQUOTE_;
}
} else {
var G__22083 = loc_SINGLEQUOTE_;
var G__22084 = ks;
loc = G__22083;
path__$1 = G__22084;
continue;
}
} else {
var G__22085 = clojure.zip.right(clojure.zip.down(clojure.zip.down(clojure.zip.down(loc))));
var G__22086 = ks;
loc = G__22085;
path__$1 = G__22086;
continue;
}
} else {
var G__22087 = clojure.zip.right(loc);
var G__22088 = path__$1;
loc = G__22087;
path__$1 = G__22088;
continue;
}
}
}
break;
}
});
return query_template_STAR_(om.next.query_zip(query),path);
});
om.next.replace = (function om$next$replace(template,new_query){
return clojure.zip.root(clojure.zip.replace(template,new_query));
});
om.next.focused_join = (function om$next$focused_join(expr,ks){
var expr_meta = cljs.core.meta(expr);
var expr_SINGLEQUOTE_ = ((cljs.core.map_QMARK_(expr))?cljs.core.PersistentArrayMap.fromArray([cljs.core.ffirst(expr),(function (){var G__22098 = cljs.core.second(cljs.core.first(expr));
var G__22099 = ks;
return (om.next.focus_query.cljs$core$IFn$_invoke$arity$2 ? om.next.focus_query.cljs$core$IFn$_invoke$arity$2(G__22098,G__22099) : om.next.focus_query.call(null,G__22098,G__22099));
})()], true, false):((cljs.core.seq_QMARK_(expr))?(function (){var x__7055__auto__ = om$next$focused_join(cljs.core.first(expr),ks);
return cljs.core._conj((function (){var x__7055__auto____$1 = cljs.core.second(expr);
return cljs.core._conj(cljs.core.List.EMPTY,x__7055__auto____$1);
})(),x__7055__auto__);
})():expr
));
var G__22102 = expr_SINGLEQUOTE_;
if(cljs.core.some_QMARK_(expr_meta)){
return cljs.core.with_meta(G__22102,expr_meta);
} else {
return G__22102;
}
});
/**
 * Given a query, focus it along the specified path.
 * 
 *   Examples:
 *  (om.next/focus-query [:foo :bar :baz] [:foo])
 *  => [:foo]
 * 
 *  (om.next/focus-query [{:foo [:bar :baz]} :woz] [:foo :bar])
 *  => [{:foo [:bar]}]
 */
om.next.focus_query = (function om$next$focus_query(query,path){
if(cljs.core.empty_QMARK_(path)){
return query;
} else {
var vec__22112 = path;
var seq__22113 = cljs.core.seq(vec__22112);
var first__22114 = cljs.core.first(seq__22113);
var seq__22113__$1 = cljs.core.next(seq__22113);
var k = first__22114;
var ks = seq__22113__$1;
var match = ((function (vec__22112,seq__22113,first__22114,seq__22113__$1,k,ks){
return (function om$next$focus_query_$_match(x){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,om.util.join_key(x));
});})(vec__22112,seq__22113,first__22114,seq__22113__$1,k,ks))
;
var value = ((function (vec__22112,seq__22113,first__22114,seq__22113__$1,k,ks){
return (function om$next$focus_query_$_value(x){
return om.next.focused_join(x,ks);
});})(vec__22112,seq__22113,first__22114,seq__22113__$1,k,ks))
;
if(cljs.core.map_QMARK_(query)){
return cljs.core.PersistentArrayMap.fromArray([k,om$next$focus_query(cljs.core.get.cljs$core$IFn$_invoke$arity$2(query,k),ks)], true, false);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(match),cljs.core.map.cljs$core$IFn$_invoke$arity$1(value),cljs.core.take.cljs$core$IFn$_invoke$arity$1((1))),query);
}
}
});
/**
 * Given a focused query return the path represented by the query.
 * 
 * Examples:
 * 
 *   (om.next/focus->path [{:foo [{:bar {:baz []}]}])
 *   => [:foo :bar :baz]
 */
om.next.focus__GT_path = (function om$next$focus__GT_path(var_args){
var args22121 = [];
var len__7296__auto___22127 = arguments.length;
var i__7297__auto___22128 = (0);
while(true){
if((i__7297__auto___22128 < len__7296__auto___22127)){
args22121.push((arguments[i__7297__auto___22128]));

var G__22129 = (i__7297__auto___22128 + (1));
i__7297__auto___22128 = G__22129;
continue;
} else {
}
break;
}

var G__22123 = args22121.length;
switch (G__22123) {
case 1:
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22121.length)].join('')));

}
});

om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$1 = (function (focus){
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3(focus,cljs.core.cst$sym$_STAR_,cljs.core.PersistentVector.EMPTY);
});

om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$2 = (function (focus,bound){
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3(focus,bound,cljs.core.PersistentVector.EMPTY);
});

om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3 = (function (focus,bound,path){
while(true){
if(cljs.core.truth_((function (){var and__6209__auto__ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(bound,cljs.core.cst$sym$_STAR_)) || ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(path,bound)) && ((cljs.core.count(path) < cljs.core.count(bound))));
if(and__6209__auto__){
var and__6209__auto____$1 = cljs.core.some(om.util.join_QMARK_,focus);
if(cljs.core.truth_(and__6209__auto____$1)){
return ((1) === cljs.core.count(focus));
} else {
return and__6209__auto____$1;
}
} else {
return and__6209__auto__;
}
})())){
var vec__22124 = om.util.join_entry(cljs.core.first(focus));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22124,(0),null);
var focus_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22124,(1),null);
var k__$1 = ((om.util.ident_QMARK_(k))?cljs.core.first(k):k);
var focus_SINGLEQUOTE___$1 = ((om.util.recursion_QMARK_(focus_SINGLEQUOTE_))?focus:focus_SINGLEQUOTE_);
var G__22132 = focus_SINGLEQUOTE___$1;
var G__22133 = bound;
var G__22134 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k__$1);
focus = G__22132;
bound = G__22133;
path = G__22134;
continue;
} else {
return path;
}
break;
}
});

om.next.focus__GT_path.cljs$lang$maxFixedArity = 3;


/**
 * @interface
 */
om.next.Ident = function(){};

/**
 * Return the ident for this component
 */
om.next.ident = (function om$next$ident(this$,props){
if((!((this$ == null))) && (!((this$.om$next$Ident$ident$arity$2 == null)))){
return this$.om$next$Ident$ident$arity$2(this$,props);
} else {
var x__6884__auto__ = (((this$ == null))?null:this$);
var m__6885__auto__ = (om.next.ident[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$2 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$2(this$,props) : m__6885__auto__.call(null,this$,props));
} else {
var m__6885__auto____$1 = (om.next.ident["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,props) : m__6885__auto____$1.call(null,this$,props));
} else {
throw cljs.core.missing_protocol("Ident.ident",this$);
}
}
}
});


/**
 * @interface
 */
om.next.IQueryParams = function(){};

/**
 * Return the query parameters
 */
om.next.params = (function om$next$params(this$){
if((!((this$ == null))) && (!((this$.om$next$IQueryParams$params$arity$1 == null)))){
return this$.om$next$IQueryParams$params$arity$1(this$);
} else {
var x__6884__auto__ = (((this$ == null))?null:this$);
var m__6885__auto__ = (om.next.params[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto__.call(null,this$));
} else {
var m__6885__auto____$1 = (om.next.params["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("IQueryParams.params",this$);
}
}
}
});

(om.next.IQueryParams["_"] = true);

(om.next.params["_"] = (function (_){
return null;
}));

/**
 * @interface
 */
om.next.IQuery = function(){};

/**
 * Return the component's unbound query
 */
om.next.query = (function om$next$query(this$){
if((!((this$ == null))) && (!((this$.om$next$IQuery$query$arity$1 == null)))){
return this$.om$next$IQuery$query$arity$1(this$);
} else {
var x__6884__auto__ = (((this$ == null))?null:this$);
var m__6885__auto__ = (om.next.query[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto__.call(null,this$));
} else {
var m__6885__auto____$1 = (om.next.query["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("IQuery.query",this$);
}
}
}
});


/**
 * @interface
 */
om.next.ILocalState = function(){};

/**
 * Set the component's local state
 */
om.next._set_state_BANG_ = (function om$next$_set_state_BANG_(this$,new_state){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_set_state_BANG_$arity$2 == null)))){
return this$.om$next$ILocalState$_set_state_BANG_$arity$2(this$,new_state);
} else {
var x__6884__auto__ = (((this$ == null))?null:this$);
var m__6885__auto__ = (om.next._set_state_BANG_[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$2 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_state) : m__6885__auto__.call(null,this$,new_state));
} else {
var m__6885__auto____$1 = (om.next._set_state_BANG_["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,new_state) : m__6885__auto____$1.call(null,this$,new_state));
} else {
throw cljs.core.missing_protocol("ILocalState.-set-state!",this$);
}
}
}
});

/**
 * Get the component's local state
 */
om.next._get_state = (function om$next$_get_state(this$){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_get_state$arity$1 == null)))){
return this$.om$next$ILocalState$_get_state$arity$1(this$);
} else {
var x__6884__auto__ = (((this$ == null))?null:this$);
var m__6885__auto__ = (om.next._get_state[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto__.call(null,this$));
} else {
var m__6885__auto____$1 = (om.next._get_state["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("ILocalState.-get-state",this$);
}
}
}
});

/**
 * Get the component's rendered local state
 */
om.next._get_rendered_state = (function om$next$_get_rendered_state(this$){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_get_rendered_state$arity$1 == null)))){
return this$.om$next$ILocalState$_get_rendered_state$arity$1(this$);
} else {
var x__6884__auto__ = (((this$ == null))?null:this$);
var m__6885__auto__ = (om.next._get_rendered_state[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto__.call(null,this$));
} else {
var m__6885__auto____$1 = (om.next._get_rendered_state["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("ILocalState.-get-rendered-state",this$);
}
}
}
});

/**
 * Get the component's pending local state
 */
om.next._merge_pending_state_BANG_ = (function om$next$_merge_pending_state_BANG_(this$){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_merge_pending_state_BANG_$arity$1 == null)))){
return this$.om$next$ILocalState$_merge_pending_state_BANG_$arity$1(this$);
} else {
var x__6884__auto__ = (((this$ == null))?null:this$);
var m__6885__auto__ = (om.next._merge_pending_state_BANG_[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto__.call(null,this$));
} else {
var m__6885__auto____$1 = (om.next._merge_pending_state_BANG_["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__6885__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("ILocalState.-merge-pending-state!",this$);
}
}
}
});

om.next.var_QMARK_ = (function om$next$var_QMARK_(x){
var and__6209__auto__ = (x instanceof cljs.core.Symbol);
if(and__6209__auto__){
var G__22199 = [cljs.core.str(x)].join('');
var G__22200 = "?";
return goog.string.startsWith(G__22199,G__22200);
} else {
return and__6209__auto__;
}
});
om.next.var__GT_keyword = (function om$next$var__GT_keyword(x){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.str(x)].join('').substring((1)));
});
om.next.replace_var = (function om$next$replace_var(expr,params){
if(cljs.core.truth_(om.next.var_QMARK_(expr))){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(params,om.next.var__GT_keyword(expr),expr);
} else {
return expr;
}
});
om.next.bind_query = (function om$next$bind_query(query,params){
var qm = cljs.core.meta(query);
var tr = cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (qm){
return (function (p1__22209_SHARP_){
return om$next$bind_query(p1__22209_SHARP_,params);
});})(qm))
);
var ret = ((cljs.core.seq_QMARK_(query))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.list,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,tr,query)):((cljs.core.coll_QMARK_(query))?cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.empty(query),tr,query):om.next.replace_var(query,params)
));
var G__22216 = ret;
if(cljs.core.truth_((function (){var and__6209__auto__ = qm;
if(cljs.core.truth_(and__6209__auto__)){
if(!((ret == null))){
if(((ret.cljs$lang$protocol_mask$partition0$ & (131072))) || (ret.cljs$core$IMeta$)){
return true;
} else {
if((!ret.cljs$lang$protocol_mask$partition0$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.IMeta,ret);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.IMeta,ret);
}
} else {
return and__6209__auto__;
}
})())){
return cljs.core.with_meta(G__22216,qm);
} else {
return G__22216;
}
});


om.next.get_local_query_data = (function om$next$get_local_query_data(component){
var G__22224 = (om.next.get_reconciler.cljs$core$IFn$_invoke$arity$1 ? om.next.get_reconciler.cljs$core$IFn$_invoke$arity$1(component) : om.next.get_reconciler.call(null,component));
var G__22224__$1 = (((G__22224 == null))?null:cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(G__22224));
var G__22224__$2 = (((G__22224__$1 == null))?null:cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(G__22224__$1));
var G__22224__$3 = (((G__22224__$2 == null))?null:(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__22224__$2) : cljs.core.deref.call(null,G__22224__$2)));
var G__22224__$4 = (((G__22224__$3 == null))?null:cljs.core.cst$kw$om$next_SLASH_queries.cljs$core$IFn$_invoke$arity$1(G__22224__$3));
if((G__22224__$4 == null)){
return null;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__22224__$4,component);
}
});
/**
 * Return the unbound query for a component.
 */
om.next.get_unbound_query = (function om$next$get_unbound_query(component){
return cljs.core.cst$kw$query.cljs$core$IFn$_invoke$arity$2(om.next.get_local_query_data(component),om.next.query(component));
});
/**
 * Return the query params for a component.
 */
om.next.get_params = (function om$next$get_params(component){
return cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$2(om.next.get_local_query_data(component),om.next.params(component));
});
om.next.get_component_query = (function om$next$get_component_query(c){
var qps = om.next.get_local_query_data(c);
var q = cljs.core.cst$kw$query.cljs$core$IFn$_invoke$arity$2(qps,om.next.query(c));
var c_SINGLEQUOTE_ = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(q));
if((c_SINGLEQUOTE_ == null)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Query violation, "),cljs.core.str(c),cljs.core.str(" reuses "),cljs.core.str(c_SINGLEQUOTE_),cljs.core.str(" query")].join('')),cljs.core.str("\n"),cljs.core.str("(nil? c')")].join('')));
}

return cljs.core.with_meta(om.next.bind_query(q,cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$2(qps,om.next.params(c))),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$component,cljs.core.type(c)], null));
});
om.next.iquery_QMARK_ = (function om$next$iquery_QMARK_(x){
if(((!((x == null)))?(((false) || (x.om$next$IQuery$))?true:false):false)){
return true;
} else {
if(cljs.core.truth_(goog.isFunction(x))){
var x__$1 = (function (){var G__22237 = x.prototype;
return Object.create(G__22237);
})();
if(!((x__$1 == null))){
if((false) || (x__$1.om$next$IQuery$)){
return true;
} else {
return false;
}
} else {
return false;
}
} else {
return null;
}
}
});
/**
 * Return a IQuery/IParams instance bound query. Works for component classes
 * and component instances. See also om.next/full-query.
 */
om.next.get_query = (function om$next$get_query(x){
if(((!((x == null)))?(((false) || (x.om$next$IQuery$))?true:false):false)){
if(cljs.core.truth_((om.next.component_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.component_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.component_QMARK_.call(null,x)))){
return om.next.get_component_query(x);
} else {
var q = om.next.query(x);
var c = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(q));
if((c == null)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Query violation, "),cljs.core.str(x),cljs.core.str(" reuses "),cljs.core.str(c),cljs.core.str(" query")].join('')),cljs.core.str("\n"),cljs.core.str("(nil? c)")].join('')));
}

return cljs.core.with_meta(om.next.bind_query(q,om.next.params(x)),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$component,x], null));
}
} else {
if(cljs.core.truth_(goog.isFunction(x))){
var y = (function (){var G__22245 = x.prototype;
return Object.create(G__22245);
})();
if(((!((y == null)))?(((false) || (y.om$next$IQuery$))?true:false):false)){
var q = om.next.query(y);
var c = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(q));
if((c == null)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Query violation, "),cljs.core.str(y),cljs.core.str(" reuses "),cljs.core.str(c),cljs.core.str(" query")].join('')),cljs.core.str("\n"),cljs.core.str("(nil? c)")].join('')));
}

return cljs.core.with_meta(om.next.bind_query(q,om.next.params(y)),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$component,x], null));
} else {
return null;
}
} else {
return null;
}
}
});
om.next.tag = (function om$next$tag(x,class$){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(x,cljs.core.assoc,cljs.core.cst$kw$component,class$);
});

/**
* @constructor
*/
om.next.OmProps = (function (props,basis_t){
this.props = props;
this.basis_t = basis_t;
})

om.next.OmProps.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$props,cljs.core.cst$sym$basis_DASH_t], null);
});

om.next.OmProps.cljs$lang$type = true;

om.next.OmProps.cljs$lang$ctorStr = "om.next/OmProps";

om.next.OmProps.cljs$lang$ctorPrWriter = (function (this__6827__auto__,writer__6828__auto__,opt__6829__auto__){
return cljs.core._write(writer__6828__auto__,"om.next/OmProps");
});

om.next.__GT_OmProps = (function om$next$__GT_OmProps(props,basis_t){
return (new om.next.OmProps(props,basis_t));
});

om.next.om_props = (function om$next$om_props(props,basis_t){
return (new om.next.OmProps(props,basis_t));
});
om.next.om_props_basis = (function om$next$om_props_basis(om_props){
return om_props.basis_t;
});
om.next.nil_props = om.next.om_props(null,(-1));
om.next.unwrap = (function om$next$unwrap(om_props){
return om_props.props;
});
om.next.compute_react_key = (function om$next$compute_react_key(cl,props){
var temp__4655__auto__ = cljs.core.cst$kw$react_DASH_key.cljs$core$IFn$_invoke$arity$1(props);
if(cljs.core.truth_(temp__4655__auto__)){
var rk = temp__4655__auto__;
return rk;
} else {
var temp__4655__auto____$1 = cljs.core.cst$kw$om_DASH_path.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(props));
if(cljs.core.truth_(temp__4655__auto____$1)){
var idx = temp__4655__auto____$1;
return [cljs.core.str(cl.name),cljs.core.str("_"),cljs.core.str(idx)].join('');
} else {
return undefined;
}
}
});
/**
 * Create a factory constructor from a component class created with
 * om.next/defui.
 */
om.next.factory = (function om$next$factory(var_args){
var args22267 = [];
var len__7296__auto___22292 = arguments.length;
var i__7297__auto___22293 = (0);
while(true){
if((i__7297__auto___22293 < len__7296__auto___22292)){
args22267.push((arguments[i__7297__auto___22293]));

var G__22295 = (i__7297__auto___22293 + (1));
i__7297__auto___22293 = G__22295;
continue;
} else {
}
break;
}

var G__22274 = args22267.length;
switch (G__22274) {
case 1:
return om.next.factory.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.factory.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22267.length)].join('')));

}
});

om.next.factory.cljs$core$IFn$_invoke$arity$1 = (function (class$){
return om.next.factory.cljs$core$IFn$_invoke$arity$2(class$,null);
});

om.next.factory.cljs$core$IFn$_invoke$arity$2 = (function (class$,p__22276){
var map__22277 = p__22276;
var map__22277__$1 = ((((!((map__22277 == null)))?((((map__22277.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22277.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22277):map__22277);
var opts = map__22277__$1;
var validator = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22277__$1,cljs.core.cst$kw$validator);
var keyfn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22277__$1,cljs.core.cst$kw$keyfn);
if(cljs.core.fn_QMARK_(class$)){
} else {
throw (new Error("Assert failed: (fn? class)"));
}

return ((function (map__22277,map__22277__$1,opts,validator,keyfn){
return (function() { 
var om$next$self__delegate = function (props,children){
if((validator == null)){
} else {
if(cljs.core.truth_((validator.cljs$core$IFn$_invoke$arity$1 ? validator.cljs$core$IFn$_invoke$arity$1(props) : validator.call(null,props)))){
} else {
throw (new Error("Assert failed: (validator props)"));
}
}

if(cljs.core.truth_(om.next._STAR_instrument_STAR_)){
var G__22287 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$props,props,cljs.core.cst$kw$children,children,cljs.core.cst$kw$class,class$,cljs.core.cst$kw$factory,om$next$self], null);
return (om.next._STAR_instrument_STAR_.cljs$core$IFn$_invoke$arity$1 ? om.next._STAR_instrument_STAR_.cljs$core$IFn$_invoke$arity$1(G__22287) : om.next._STAR_instrument_STAR_.call(null,G__22287));
} else {
var key = ((!((keyfn == null)))?(keyfn.cljs$core$IFn$_invoke$arity$1 ? keyfn.cljs$core$IFn$_invoke$arity$1(props) : keyfn.call(null,props)):om.next.compute_react_key(class$,props));
var ref = cljs.core.cst$kw$ref.cljs$core$IFn$_invoke$arity$1(props);
var ref__$1 = (function (){var G__22288 = ref;
if((ref instanceof cljs.core.Keyword)){
return [cljs.core.str(G__22288)].join('');
} else {
return G__22288;
}
})();
var t = ((!((om.next._STAR_reconciler_STAR_ == null)))?om.next.protocols.basis_t(om.next._STAR_reconciler_STAR_):(0));
var G__22289 = class$;
var G__22290 = {"omcljs$value": om.next.om_props(props,t), "omcljs$instrument": om.next._STAR_instrument_STAR_, "key": key, "omcljs$reactKey": key, "ref": ref__$1, "omcljs$shared": om.next._STAR_shared_STAR_, "omcljs$path": cljs.core.cst$kw$om_DASH_path.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(props)), "omcljs$reconciler": om.next._STAR_reconciler_STAR_, "omcljs$depth": om.next._STAR_depth_STAR_, "omcljs$parent": om.next._STAR_parent_STAR_};
var G__22291 = om.util.force_children(children);
return React.createElement(G__22289,G__22290,G__22291);
}
};
var om$next$self = function (props,var_args){
var children = null;
if (arguments.length > 1) {
var G__22323__i = 0, G__22323__a = new Array(arguments.length -  1);
while (G__22323__i < G__22323__a.length) {G__22323__a[G__22323__i] = arguments[G__22323__i + 1]; ++G__22323__i;}
  children = new cljs.core.IndexedSeq(G__22323__a,0);
} 
return om$next$self__delegate.call(this,props,children);};
om$next$self.cljs$lang$maxFixedArity = 1;
om$next$self.cljs$lang$applyTo = (function (arglist__22324){
var props = cljs.core.first(arglist__22324);
var children = cljs.core.rest(arglist__22324);
return om$next$self__delegate(props,children);
});
om$next$self.cljs$core$IFn$_invoke$arity$variadic = om$next$self__delegate;
return om$next$self;
})()
;
;})(map__22277,map__22277__$1,opts,validator,keyfn))
});

om.next.factory.cljs$lang$maxFixedArity = 2;

/**
 * Returns true if the argument is an Om component.
 */
om.next.component_QMARK_ = (function om$next$component_QMARK_(x){
if(!((x == null))){
return x.om$isComponent === true;
} else {
return false;
}
});
om.next.state = (function om$next$state(c){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error("Assert failed: (component? c)"));
}

return c.state;
});
/**
 * PRIVATE: Do not use
 */
om.next.get_prop = (function om$next$get_prop(c,k){
var G__22333 = c.props;
var G__22334 = k;
return goog.object.get(G__22333,G__22334);
});
om.next.get_props_STAR_ = (function om$next$get_props_STAR_(x,k){
if((x == null)){
return om.next.nil_props;
} else {
var y = goog.object.get(x,k);
if((y == null)){
return om.next.nil_props;
} else {
return y;
}
}
});
om.next.get_prev_props = (function om$next$get_prev_props(x){
return om.next.get_props_STAR_(x,"omcljs$prev$value");
});
om.next.get_next_props = (function om$next$get_next_props(x){
return om.next.get_props_STAR_(x,"omcljs$next$value");
});
om.next.get_props = (function om$next$get_props(x){
return om.next.get_props_STAR_(x,"omcljs$value");
});
/**
 * PRIVATE: Do not use
 */
om.next.set_prop_BANG_ = (function om$next$set_prop_BANG_(c,k,v){
var G__22344 = c.props;
var G__22345 = k;
var G__22346 = v;
return goog.object.set(G__22344,G__22345,G__22346);
});
om.next.get_reconciler = (function om$next$get_reconciler(c){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error("Assert failed: (component? c)"));
}

return om.next.get_prop(c,"omcljs$reconciler");
});
om.next.props_STAR_ = (function om$next$props_STAR_(var_args){
var args22355 = [];
var len__7296__auto___22364 = arguments.length;
var i__7297__auto___22365 = (0);
while(true){
if((i__7297__auto___22365 < len__7296__auto___22364)){
args22355.push((arguments[i__7297__auto___22365]));

var G__22366 = (i__7297__auto___22365 + (1));
i__7297__auto___22365 = G__22366;
continue;
} else {
}
break;
}

var G__22358 = args22355.length;
switch (G__22358) {
case 2:
return om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.props_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22355.length)].join('')));

}
});

om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return cljs.core.max_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,x,y);
});

om.next.props_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (x,y,z){
return cljs.core.max_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,x,om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(y,z));
});

om.next.props_STAR_.cljs$lang$maxFixedArity = 3;

om.next.prev_props_STAR_ = (function om$next$prev_props_STAR_(var_args){
var args22371 = [];
var len__7296__auto___22375 = arguments.length;
var i__7297__auto___22377 = (0);
while(true){
if((i__7297__auto___22377 < len__7296__auto___22375)){
args22371.push((arguments[i__7297__auto___22377]));

var G__22379 = (i__7297__auto___22377 + (1));
i__7297__auto___22377 = G__22379;
continue;
} else {
}
break;
}

var G__22373 = args22371.length;
switch (G__22373) {
case 2:
return om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22371.length)].join('')));

}
});

om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return cljs.core.min_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,x,y);
});

om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (x,y,z){
return cljs.core.min_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(x,y),om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(y,z));
});

om.next.prev_props_STAR_.cljs$lang$maxFixedArity = 3;

om.next._prev_props = (function om$next$_prev_props(prev_props,component){
var cst = component.state;
var props = component.props;
return om.next.unwrap(om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(prev_props),om.next.get_prev_props(cst)),om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(cst),om.next.get_props(props))));
});
om.next._next_props = (function om$next$_next_props(next_props,component){
return om.next.unwrap(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$3(om.next.get_props(component.props),om.next.get_props(next_props),om.next.get_next_props(component.state)));
});
om.next.merge_pending_props_BANG_ = (function om$next$merge_pending_props_BANG_(c){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error("Assert failed: (component? c)"));
}

var cst = c.state;
var props = c.props;
var pending = goog.object.get(cst,"omcljs$next$value");
var prev = om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(cst),om.next.get_props(props));
goog.object.set(cst,"omcljs$prev$value",prev);

if((pending == null)){
return null;
} else {
goog.object.remove(cst,"omcljs$next$value");

return goog.object.set(cst,"omcljs$value",pending);
}
});
om.next.clear_prev_props_BANG_ = (function om$next$clear_prev_props_BANG_(c){
var G__22404 = c.state;
var G__22405 = "omcljs$prev$value";
return goog.object.remove(G__22404,G__22405);
});
/**
 * Get basis t value for when the component last read its props from
 * the global state.
 */
om.next.t = (function om$next$t(c){
return om.next.om_props_basis(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(c.props),om.next.get_props(c.state)));
});
/**
 * Returns the parent Om component.
 */
om.next.parent = (function om$next$parent(component){
return om.next.get_prop(component,"omcljs$parent");
});
/**
 * PRIVATE: Returns the render depth (a integer) of the component relative to
 *   the mount root.
 */
om.next.depth = (function om$next$depth(component){
if(om.next.component_QMARK_(component)){
return om.next.get_prop(component,"omcljs$depth");
} else {
return null;
}
});
/**
 * Returns the components React key.
 */
om.next.react_key = (function om$next$react_key(component){
return om.next.get_prop(component,"omcljs$reactKey");
});
/**
 * Returns the component type, regardless of whether the component has been
 * mounted
 */
om.next.react_type = (function om$next$react_type(x){
var or__6221__auto__ = goog.object.get(x,"type");
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return cljs.core.type(x);
}
});
/**
 * Returns the component's Om data path.
 */
om.next.path = (function om$next$path(c){
return om.next.get_prop(c,"omcljs$path");
});
/**
 * Return the global shared properties of the Om Next root. See :shared and
 * :shared-fn reconciler options.
 */
om.next.shared = (function om$next$shared(var_args){
var args22423 = [];
var len__7296__auto___22441 = arguments.length;
var i__7297__auto___22443 = (0);
while(true){
if((i__7297__auto___22443 < len__7296__auto___22441)){
args22423.push((arguments[i__7297__auto___22443]));

var G__22444 = (i__7297__auto___22443 + (1));
i__7297__auto___22443 = G__22444;
continue;
} else {
}
break;
}

var G__22429 = args22423.length;
switch (G__22429) {
case 1:
return om.next.shared.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.shared.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22423.length)].join('')));

}
});

om.next.shared.cljs$core$IFn$_invoke$arity$1 = (function (component){
return om.next.shared.cljs$core$IFn$_invoke$arity$2(component,cljs.core.PersistentVector.EMPTY);
});

om.next.shared.cljs$core$IFn$_invoke$arity$2 = (function (component,k_or_ks){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error("Assert failed: (component? component)"));
}

var shared = (function (){var G__22433 = component.props;
var G__22434 = "omcljs$shared";
return goog.object.get(G__22433,G__22434);
})();
var ks = (function (){var G__22436 = k_or_ks;
if(!(cljs.core.sequential_QMARK_(k_or_ks))){
return (new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[G__22436],null));
} else {
return G__22436;
}
})();
var G__22439 = shared;
if(!(cljs.core.empty_QMARK_(ks))){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(G__22439,ks);
} else {
return G__22439;
}
});

om.next.shared.cljs$lang$maxFixedArity = 2;

om.next.instrument = (function om$next$instrument(component){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error("Assert failed: (component? component)"));
}

return om.next.get_prop(component,"omcljs$instrument");
});
om.next.update_props_BANG_ = (function om$next$update_props_BANG_(c,next_props){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error("Assert failed: (component? c)"));
}

var G__22458 = c.state;
var G__22464_22467 = G__22458;
var G__22465_22468 = "omcljs$next$value";
var G__22466_22469 = om.next.om_props(next_props,om.next.protocols.basis_t(om.next.get_reconciler(c)));
goog.object.set(G__22464_22467,G__22465_22468,G__22466_22469);

return G__22458;
});
/**
 * Return a components props.
 */
om.next.props = (function om$next$props(component){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error("Assert failed: (component? component)"));
}

return om.next.unwrap(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(component.props),om.next.get_props(component.state)));
});
/**
 * Add computed properties to props. Note will replace any pre-existing
 * computed properties.
 */
om.next.computed = (function om$next$computed(props,computed_map){
if((props == null)){
return null;
} else {
if(cljs.core.vector_QMARK_(props)){
var G__22472 = props;
if(!(cljs.core.empty_QMARK_(computed_map))){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(G__22472,cljs.core.assoc,cljs.core.cst$kw$om$next_SLASH_computed,computed_map);
} else {
return G__22472;
}
} else {
var G__22481 = props;
if(!(cljs.core.empty_QMARK_(computed_map))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__22481,cljs.core.cst$kw$om$next_SLASH_computed,computed_map);
} else {
return G__22481;
}
}
}
});
/**
 * Return the computed properties on a component or its props.
 */
om.next.get_computed = (function om$next$get_computed(var_args){
var args22489 = [];
var len__7296__auto___22500 = arguments.length;
var i__7297__auto___22501 = (0);
while(true){
if((i__7297__auto___22501 < len__7296__auto___22500)){
args22489.push((arguments[i__7297__auto___22501]));

var G__22505 = (i__7297__auto___22501 + (1));
i__7297__auto___22501 = G__22505;
continue;
} else {
}
break;
}

var G__22494 = args22489.length;
switch (G__22494) {
case 1:
return om.next.get_computed.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.get_computed.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22489.length)].join('')));

}
});

om.next.get_computed.cljs$core$IFn$_invoke$arity$1 = (function (x){
return om.next.get_computed.cljs$core$IFn$_invoke$arity$2(x,cljs.core.PersistentVector.EMPTY);
});

om.next.get_computed.cljs$core$IFn$_invoke$arity$2 = (function (x,k_or_ks){
if((x == null)){
return null;
} else {
var props = (function (){var G__22495 = x;
if(om.next.component_QMARK_(x)){
return om.next.props(G__22495);
} else {
return G__22495;
}
})();
var ks = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_computed], null),(function (){var G__22496 = k_or_ks;
if(!(cljs.core.sequential_QMARK_(k_or_ks))){
return (new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[G__22496],null));
} else {
return G__22496;
}
})());
if(cljs.core.vector_QMARK_(props)){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.meta(props),ks);
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(props,ks);
}
}
});

om.next.get_computed.cljs$lang$maxFixedArity = 2;

/**
 * Set the component local state of the component. Analogous to React's
 * setState.
 */
om.next.set_state_BANG_ = (function om$next$set_state_BANG_(component,new_state){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error("Assert failed: (component? component)"));
}

if(((!((component == null)))?(((false) || (component.om$next$ILocalState$))?true:false):false)){
om.next._set_state_BANG_(component,new_state);
} else {
var G__22537_22540 = component.state;
var G__22538_22541 = "omcljs$pendingState";
var G__22539_22542 = new_state;
goog.object.set(G__22537_22540,G__22538_22541,G__22539_22542);
}

var temp__4655__auto__ = om.next.get_reconciler(component);
if(cljs.core.truth_(temp__4655__auto__)){
var r = temp__4655__auto__;
om.next.protocols.queue_BANG_(r,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [component], null));

return (om.next.schedule_render_BANG_.cljs$core$IFn$_invoke$arity$1 ? om.next.schedule_render_BANG_.cljs$core$IFn$_invoke$arity$1(r) : om.next.schedule_render_BANG_.call(null,r));
} else {
return component.forceUpdate();
}
});
/**
 * Get a component's local state. May provide a single key or a sequential
 * collection of keys for indexed access into the component's local state.
 */
om.next.get_state = (function om$next$get_state(var_args){
var args22548 = [];
var len__7296__auto___22556 = arguments.length;
var i__7297__auto___22557 = (0);
while(true){
if((i__7297__auto___22557 < len__7296__auto___22556)){
args22548.push((arguments[i__7297__auto___22557]));

var G__22558 = (i__7297__auto___22557 + (1));
i__7297__auto___22557 = G__22558;
continue;
} else {
}
break;
}

var G__22551 = args22548.length;
switch (G__22551) {
case 1:
return om.next.get_state.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.get_state.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22548.length)].join('')));

}
});

om.next.get_state.cljs$core$IFn$_invoke$arity$1 = (function (component){
return om.next.get_state.cljs$core$IFn$_invoke$arity$2(component,cljs.core.PersistentVector.EMPTY);
});

om.next.get_state.cljs$core$IFn$_invoke$arity$2 = (function (component,k_or_ks){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error("Assert failed: (component? component)"));
}

var cst = ((((!((component == null)))?(((false) || (component.om$next$ILocalState$))?true:false):false))?om.next._get_state(component):(function (){var temp__4657__auto__ = component.state;
if(cljs.core.truth_(temp__4657__auto__)){
var state = temp__4657__auto__;
var or__6221__auto__ = goog.object.get(state,"omcljs$pendingState");
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return goog.object.get(state,"omcljs$state");
}
} else {
return null;
}
})());
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cst,((cljs.core.sequential_QMARK_(k_or_ks))?k_or_ks:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k_or_ks], null)));
});

om.next.get_state.cljs$lang$maxFixedArity = 2;

/**
 * Update a component's local state. Similar to Clojure(Script)'s swap!
 */
om.next.update_state_BANG_ = (function om$next$update_state_BANG_(var_args){
var args22560 = [];
var len__7296__auto___22594 = arguments.length;
var i__7297__auto___22595 = (0);
while(true){
if((i__7297__auto___22595 < len__7296__auto___22594)){
args22560.push((arguments[i__7297__auto___22595]));

var G__22596 = (i__7297__auto___22595 + (1));
i__7297__auto___22595 = G__22596;
continue;
} else {
}
break;
}

var G__22575 = args22560.length;
switch (G__22575) {
case 2:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
var argseq__7315__auto__ = (new cljs.core.IndexedSeq(args22560.slice((6)),(0),null));
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),argseq__7315__auto__);

}
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,f){
return om.next.set_state_BANG_(component,(function (){var G__22579 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__22579) : f.call(null,G__22579));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (component,f,arg0){
return om.next.set_state_BANG_(component,(function (){var G__22580 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__22581 = arg0;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__22580,G__22581) : f.call(null,G__22580,G__22581));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (component,f,arg0,arg1){
return om.next.set_state_BANG_(component,(function (){var G__22582 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__22583 = arg0;
var G__22584 = arg1;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__22582,G__22583,G__22584) : f.call(null,G__22582,G__22583,G__22584));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (component,f,arg0,arg1,arg2){
return om.next.set_state_BANG_(component,(function (){var G__22585 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__22586 = arg0;
var G__22587 = arg1;
var G__22588 = arg2;
return (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(G__22585,G__22586,G__22587,G__22588) : f.call(null,G__22585,G__22586,G__22587,G__22588));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$6 = (function (component,f,arg0,arg1,arg2,arg3){
return om.next.set_state_BANG_(component,(function (){var G__22589 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__22590 = arg0;
var G__22591 = arg1;
var G__22592 = arg2;
var G__22593 = arg3;
return (f.cljs$core$IFn$_invoke$arity$5 ? f.cljs$core$IFn$_invoke$arity$5(G__22589,G__22590,G__22591,G__22592,G__22593) : f.call(null,G__22589,G__22590,G__22591,G__22592,G__22593));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (component,f,arg0,arg1,arg2,arg3,arg_rest){
return om.next.set_state_BANG_(component,cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(f,om.next.get_state.cljs$core$IFn$_invoke$arity$1(component),arg0,arg1,arg2,cljs.core.array_seq([arg3,arg_rest], 0)));
});

om.next.update_state_BANG_.cljs$lang$applyTo = (function (seq22561){
var G__22562 = cljs.core.first(seq22561);
var seq22561__$1 = cljs.core.next(seq22561);
var G__22563 = cljs.core.first(seq22561__$1);
var seq22561__$2 = cljs.core.next(seq22561__$1);
var G__22564 = cljs.core.first(seq22561__$2);
var seq22561__$3 = cljs.core.next(seq22561__$2);
var G__22565 = cljs.core.first(seq22561__$3);
var seq22561__$4 = cljs.core.next(seq22561__$3);
var G__22566 = cljs.core.first(seq22561__$4);
var seq22561__$5 = cljs.core.next(seq22561__$4);
var G__22567 = cljs.core.first(seq22561__$5);
var seq22561__$6 = cljs.core.next(seq22561__$5);
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__22562,G__22563,G__22564,G__22565,G__22566,G__22567,seq22561__$6);
});

om.next.update_state_BANG_.cljs$lang$maxFixedArity = (6);

/**
 * Get the rendered state of component. om.next/get-state always returns the
 * up-to-date state.
 */
om.next.get_rendered_state = (function om$next$get_rendered_state(component){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error("Assert failed: (component? component)"));
}

if(((!((component == null)))?(((false) || (component.om$next$ILocalState$))?true:false):false)){
return om.next._get_rendered_state(component);
} else {
var G__22615 = component;
var G__22615__$1 = (((G__22615 == null))?null:G__22615.state);
if((G__22615__$1 == null)){
return null;
} else {
return goog.object.get(G__22615__$1,"omcljs$state");
}
}
});
om.next.merge_pending_state_BANG_ = (function om$next$merge_pending_state_BANG_(c){
if(((!((c == null)))?(((false) || (c.om$next$ILocalState$))?true:false):false)){
return om.next._merge_pending_state_BANG_(c);
} else {
var temp__4657__auto__ = (function (){var G__22622 = c;
var G__22622__$1 = (((G__22622 == null))?null:G__22622.state);
if((G__22622__$1 == null)){
return null;
} else {
return goog.object.get(G__22622__$1,"omcljs$pendingState");
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var pending = temp__4657__auto__;
var state = c.state;
var previous = goog.object.get(state,"omcljs$state");
goog.object.remove(state,"omcljs$pendingState");

goog.object.set(state,"omcljs$previousState",previous);

return goog.object.set(state,"omcljs$state",pending);
} else {
return null;
}
}
});
om.next.react_set_state_BANG_ = (function om$next$react_set_state_BANG_(var_args){
var args22625 = [];
var len__7296__auto___22630 = arguments.length;
var i__7297__auto___22631 = (0);
while(true){
if((i__7297__auto___22631 < len__7296__auto___22630)){
args22625.push((arguments[i__7297__auto___22631]));

var G__22633 = (i__7297__auto___22631 + (1));
i__7297__auto___22631 = G__22633;
continue;
} else {
}
break;
}

var G__22629 = args22625.length;
switch (G__22629) {
case 2:
return om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22625.length)].join('')));

}
});

om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,new_state){
return om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$3(component,new_state,null);
});

om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (component,new_state,cb){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error("Assert failed: (component? component)"));
}

return component.setState({"omcljs$state": new_state},cb);
});

om.next.react_set_state_BANG_.cljs$lang$maxFixedArity = 3;






om.next.gather_sends = (function om$next$gather_sends(p__22640,q,remotes){
var map__22696 = p__22640;
var map__22696__$1 = ((((!((map__22696 == null)))?((((map__22696.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22696.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22696):map__22696);
var env = map__22696__$1;
var parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22696__$1,cljs.core.cst$kw$parser);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (map__22696,map__22696__$1,env,parser){
return (function (p1__22639_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__22639_SHARP_,(parser.cljs$core$IFn$_invoke$arity$3 ? parser.cljs$core$IFn$_invoke$arity$3(env,q,p1__22639_SHARP_) : parser.call(null,env,q,p1__22639_SHARP_))],null));
});})(map__22696,map__22696__$1,env,parser))
),cljs.core.filter.cljs$core$IFn$_invoke$arity$1(((function (map__22696,map__22696__$1,env,parser){
return (function (p__22698){
var vec__22699 = p__22698;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22699,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22699,(1),null);
return (cljs.core.count(v) > (0));
});})(map__22696,map__22696__$1,env,parser))
)),remotes);
});
/**
 * Given r (a reconciler) and a query expression including a mutation and
 * any simple reads, return the equivalent query expression where the simple
 * reads have been replaced by the full query for each component that cares about
 * the specified read.
 */
om.next.transform_reads = (function om$next$transform_reads(r,tx){
var with_target = (function om$next$transform_reads_$_with_target(target,q){
if(!((target == null))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__22746 = cljs.core.first(q);
var G__22747 = target;
return (om.next.force.cljs$core$IFn$_invoke$arity$2 ? om.next.force.cljs$core$IFn$_invoke$arity$2(G__22746,G__22747) : om.next.force.call(null,G__22746,G__22747));
})()], null);
} else {
return q;
}
});
var add_focused_query = (function om$next$transform_reads_$_add_focused_query(k,target,tx__$1,c){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(tx__$1,(function (){var G__22750 = c;
var G__22751 = with_target(target,om.next.focus_query(om.next.get_query(c),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null)));
return (om.next.full_query.cljs$core$IFn$_invoke$arity$2 ? om.next.full_query.cljs$core$IFn$_invoke$arity$2(G__22750,G__22751) : om.next.full_query.call(null,G__22750,G__22751));
})());
});
var exprs = cljs.core.seq(tx);
var tx_SINGLEQUOTE_ = cljs.core.PersistentVector.EMPTY;
while(true){
if(!((exprs == null))){
var expr = cljs.core.first(exprs);
var ast = om.next.impl.parser.expr__GT_ast(expr);
var key = cljs.core.cst$kw$key.cljs$core$IFn$_invoke$arity$1(ast);
var tgt = cljs.core.cst$kw$target.cljs$core$IFn$_invoke$arity$1(ast);
if((key instanceof cljs.core.Keyword)){
var G__22760 = cljs.core.next(exprs);
var G__22761 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (exprs,tx_SINGLEQUOTE_,expr,ast,key,tgt){
return (function (p1__22708_SHARP_,p2__22709_SHARP_){
return add_focused_query(key,tgt,p1__22708_SHARP_,p2__22709_SHARP_);
});})(exprs,tx_SINGLEQUOTE_,expr,ast,key,tgt))
,tx_SINGLEQUOTE_,(om.next.ref__GT_components.cljs$core$IFn$_invoke$arity$2 ? om.next.ref__GT_components.cljs$core$IFn$_invoke$arity$2(r,key) : om.next.ref__GT_components.call(null,r,key)));
exprs = G__22760;
tx_SINGLEQUOTE_ = G__22761;
continue;
} else {
var G__22765 = cljs.core.next(exprs);
var G__22766 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(tx_SINGLEQUOTE_,expr);
exprs = G__22765;
tx_SINGLEQUOTE_ = G__22766;
continue;
}
} else {
return tx_SINGLEQUOTE_;
}
break;
}
});
/**
 * Change the query of a component. Takes a map containing :params and/or
 * :query. :params should be a map of new bindings and :query should be a query
 * expression. Will schedule a re-render as well as remote re-sends if
 * necessary.
 */
om.next.set_query_BANG_ = (function om$next$set_query_BANG_(var_args){
var args22770 = [];
var len__7296__auto___22847 = arguments.length;
var i__7297__auto___22849 = (0);
while(true){
if((i__7297__auto___22849 < len__7296__auto___22847)){
args22770.push((arguments[i__7297__auto___22849]));

var G__22850 = (i__7297__auto___22849 + (1));
i__7297__auto___22849 = G__22850;
continue;
} else {
}
break;
}

var G__22776 = args22770.length;
switch (G__22776) {
case 2:
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22770.length)].join('')));

}
});

om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (x,params_AMPERSAND_query){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$3(x,params_AMPERSAND_query,null);
});

om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (x,p__22777,reads){
var map__22778 = p__22777;
var map__22778__$1 = ((((!((map__22778 == null)))?((((map__22778.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22778.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22778):map__22778);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22778__$1,cljs.core.cst$kw$params);
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22778__$1,cljs.core.cst$kw$query);
if(cljs.core.truth_((function (){var or__6221__auto__ = (om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x));
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return om.next.component_QMARK_(x);
}
})())){
} else {
throw (new Error("Assert failed: (or (reconciler? x) (component? x))"));
}

if((!((params == null))) || (!((query == null)))){
} else {
throw (new Error("Assert failed: (or (not (nil? params)) (not (nil? query)))"));
}

if(((reads == null)) || (cljs.core.vector_QMARK_(reads))){
} else {
throw (new Error("Assert failed: (or (nil? reads) (vector? reads))"));
}

var r = ((om.next.component_QMARK_(x))?om.next.get_reconciler(x):x);
var c = ((om.next.component_QMARK_(x))?x:null);
var root = cljs.core.cst$kw$root.cljs$core$IFn$_invoke$arity$1((function (){var G__22783 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(r);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__22783) : cljs.core.deref.call(null,G__22783));
})());
var cfg = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(r);
var st = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cfg);
var id = cljs.core.random_uuid();
var _ = cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cfg).add(id,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(st) : cljs.core.deref.call(null,st)));
var temp__4657__auto___22885 = cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(cfg);
if(cljs.core.truth_(temp__4657__auto___22885)){
var l_22886 = temp__4657__auto___22885;
var G__22790_22888 = l_22886;
var G__22791_22889 = [cljs.core.str((function (){var temp__4657__auto____$1 = ((((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false))?om.next.ident(c,om.next.props(c)):null);
if(cljs.core.truth_(temp__4657__auto____$1)){
var ident = temp__4657__auto____$1;
return [cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ident], 0))),cljs.core.str(" ")].join('');
} else {
return null;
}
})()),cljs.core.str((cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?"reconciler ":null)),cljs.core.str((cljs.core.truth_(query)?(function (){


return ", ";
})()
:null)),cljs.core.str((cljs.core.truth_(params)?(function (){


return " ";
})()
:null)),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([id], 0)))].join('');
goog.log.info(G__22790_22888,G__22791_22889);
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(st,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_queries,(function (){var or__6221__auto__ = c;
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return root;
}
})()], null),cljs.core.merge,cljs.core.array_seq([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(cljs.core.truth_(query)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$query,query], null):null),(cljs.core.truth_(params)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$params,params], null):null)], 0))], 0));

if((!((c == null))) && ((reads == null))){
om.next.protocols.queue_BANG_(r,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [c], null));
} else {
}

if((reads == null)){
} else {
om.next.protocols.queue_BANG_(r,reads);
}

om.next.protocols.reindex_BANG_(r);

var rootq_22925 = ((!((c == null)))?(om.next.full_query.cljs$core$IFn$_invoke$arity$1 ? om.next.full_query.cljs$core$IFn$_invoke$arity$1(c) : om.next.full_query.call(null,c)):(((reads == null))?om.next.get_query(root):null));
var sends_22926 = om.next.gather_sends((om.next.to_env.cljs$core$IFn$_invoke$arity$1 ? om.next.to_env.cljs$core$IFn$_invoke$arity$1(cfg) : om.next.to_env.call(null,cfg)),cljs.core.into.cljs$core$IFn$_invoke$arity$2((function (){var or__6221__auto__ = rootq_22925;
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),om.next.transform_reads(r,reads)),cljs.core.cst$kw$remotes.cljs$core$IFn$_invoke$arity$1(cfg));
if(cljs.core.empty_QMARK_(sends_22926)){
} else {
om.next.protocols.queue_sends_BANG_(r,sends_22926);

(om.next.schedule_sends_BANG_.cljs$core$IFn$_invoke$arity$1 ? om.next.schedule_sends_BANG_.cljs$core$IFn$_invoke$arity$1(r) : om.next.schedule_sends_BANG_.call(null,r));
}

return null;
});

om.next.set_query_BANG_.cljs$lang$maxFixedArity = 3;

/**
 * Update a component's query and query parameters with a function.
 */
om.next.update_query_BANG_ = (function om$next$update_query_BANG_(var_args){
var args22941 = [];
var len__7296__auto___22994 = arguments.length;
var i__7297__auto___22995 = (0);
while(true){
if((i__7297__auto___22995 < len__7296__auto___22994)){
args22941.push((arguments[i__7297__auto___22995]));

var G__22996 = (i__7297__auto___22995 + (1));
i__7297__auto___22995 = G__22996;
continue;
} else {
}
break;
}

var G__22953 = args22941.length;
switch (G__22953) {
case 2:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var argseq__7315__auto__ = (new cljs.core.IndexedSeq(args22941.slice((6)),(0),null));
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),argseq__7315__auto__);

}
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,f){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__22955 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__22955) : f.call(null,G__22955));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (component,f,arg0){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__22956 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__22957 = arg0;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__22956,G__22957) : f.call(null,G__22956,G__22957));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (component,f,arg0,arg1){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__22959 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__22960 = arg0;
var G__22961 = arg1;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__22959,G__22960,G__22961) : f.call(null,G__22959,G__22960,G__22961));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (component,f,arg0,arg1,arg2){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__22968 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__22969 = arg0;
var G__22970 = arg1;
var G__22971 = arg2;
return (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(G__22968,G__22969,G__22970,G__22971) : f.call(null,G__22968,G__22969,G__22970,G__22971));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (component,f,arg0,arg1,arg2,arg3,arg_rest){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(om.next.set_query_BANG_,component,(function (){var G__22979 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__22980 = arg0;
var G__22981 = arg1;
var G__22982 = arg2;
var G__22983 = arg3;
var G__22984 = arg_rest;
return (f.cljs$core$IFn$_invoke$arity$6 ? f.cljs$core$IFn$_invoke$arity$6(G__22979,G__22980,G__22981,G__22982,G__22983,G__22984) : f.call(null,G__22979,G__22980,G__22981,G__22982,G__22983,G__22984));
})());
});

om.next.update_query_BANG_.cljs$lang$applyTo = (function (seq22942){
var G__22943 = cljs.core.first(seq22942);
var seq22942__$1 = cljs.core.next(seq22942);
var G__22944 = cljs.core.first(seq22942__$1);
var seq22942__$2 = cljs.core.next(seq22942__$1);
var G__22945 = cljs.core.first(seq22942__$2);
var seq22942__$3 = cljs.core.next(seq22942__$2);
var G__22946 = cljs.core.first(seq22942__$3);
var seq22942__$4 = cljs.core.next(seq22942__$3);
var G__22947 = cljs.core.first(seq22942__$4);
var seq22942__$5 = cljs.core.next(seq22942__$4);
var G__22948 = cljs.core.first(seq22942__$5);
var seq22942__$6 = cljs.core.next(seq22942__$5);
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__22943,G__22944,G__22945,G__22946,G__22947,G__22948,seq22942__$6);
});

om.next.update_query_BANG_.cljs$lang$maxFixedArity = (6);

/**
 * Returns true if the component is mounted.
 */
om.next.mounted_QMARK_ = (function om$next$mounted_QMARK_(x){
return (om.next.component_QMARK_(x)) && (x.isMounted());
});
/**
 * Returns the component associated with a component's React ref.
 */
om.next.react_ref = (function om$next$react_ref(component,name){
var G__23014 = component.refs;
if((G__23014 == null)){
return null;
} else {
return goog.object.get(G__23014,name);
}
});
/**
 * Returns the component's children.
 */
om.next.children = (function om$next$children(component){
return component.props.children;
});
om.next.update_component_BANG_ = (function om$next$update_component_BANG_(c,next_props){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error("Assert failed: (component? c)"));
}

om.next.update_props_BANG_(c,next_props);

return c.forceUpdate();
});
om.next.should_update_QMARK_ = (function om$next$should_update_QMARK_(var_args){
var args23018 = [];
var len__7296__auto___23024 = arguments.length;
var i__7297__auto___23025 = (0);
while(true){
if((i__7297__auto___23025 < len__7296__auto___23024)){
args23018.push((arguments[i__7297__auto___23025]));

var G__23026 = (i__7297__auto___23025 + (1));
i__7297__auto___23025 = G__23026;
continue;
} else {
}
break;
}

var G__23023 = args23018.length;
switch (G__23023) {
case 2:
return om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23018.length)].join('')));

}
});

om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (c,next_props){
return om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3(c,next_props,null);
});

om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3 = (function (c,next_props,next_state){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error("Assert failed: (component? c)"));
}

return c.shouldComponentUpdate({"omcljs$value": next_props},{"omcljs$state": next_state});
});

om.next.should_update_QMARK_.cljs$lang$maxFixedArity = 3;

om.next.class_path = (function om$next$class_path(c){

new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pre,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [om.next.component_QMARK_(c)], null)], null);

var c__$1 = c;
var ret = (function (){var x__7055__auto__ = cljs.core.type(c__$1);
return cljs.core._conj(cljs.core.List.EMPTY,x__7055__auto__);
})();
while(true){
var temp__4655__auto__ = om.next.parent(c__$1);
if(cljs.core.truth_(temp__4655__auto__)){
var p = temp__4655__auto__;
if(om.next.iquery_QMARK_(p)){
var G__23036 = p;
var G__23037 = cljs.core.cons(cljs.core.type(p),ret);
c__$1 = G__23036;
ret = G__23037;
continue;
} else {
var G__23038 = p;
var G__23039 = ret;
c__$1 = G__23038;
ret = G__23039;
continue;
}
} else {
var seen = (function (){var G__23035 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23035) : cljs.core.atom.call(null,G__23035));
})();
return cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (c__$1,ret,seen,temp__4655__auto__){
return (function (x){
if(cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(seen) : cljs.core.deref.call(null,seen)),x)){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(seen,cljs.core.conj,x);

return x;
}
});})(c__$1,ret,seen,temp__4655__auto__))
,ret);
}
break;
}
});
/**
 * Given a class or mounted component x and a ref to an instantiated component
 * or class that defines a subquery, pick the most specific subquery. If the
 * component is mounted subquery-ref will be used, subquery-class otherwise.
 */
om.next.subquery = (function om$next$subquery(x,subquery_ref,subquery_class){
if(((subquery_ref instanceof cljs.core.Keyword)) || (typeof subquery_ref === 'string')){
} else {
throw (new Error("Assert failed: (or (keyword? subquery-ref) (string? subquery-ref))"));
}

if(cljs.core.fn_QMARK_(subquery_class)){
} else {
throw (new Error("Assert failed: (fn? subquery-class)"));
}

var ref = (function (){var G__23088 = subquery_ref;
if((subquery_ref instanceof cljs.core.Keyword)){
return [cljs.core.str(G__23088)].join('');
} else {
return G__23088;
}
})();
if((om.next.component_QMARK_(x)) && (om.next.mounted_QMARK_(x))){
return om.next.get_query(om.next.react_ref(x,ref));
} else {
return om.next.get_query(subquery_class);
}
});
om.next.get_ident = (function om$next$get_ident(x){

new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pre,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [om.next.component_QMARK_(x)], null)], null);

var m = om.next.props(x);
if(!((m == null))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("get-ident invoked on component with nil props"),cljs.core.str("\n"),cljs.core.str("(not (nil? m))")].join('')));
}

return om.next.ident(x,m);
});
om.next.basis_t = (function om$next$basis_t(reconciler){
return om.next.protocols.basis_t(reconciler);
});
om.next.schedule_render_BANG_ = (function om$next$schedule_render_BANG_(reconciler){
if(cljs.core.truth_(om.next.protocols.schedule_render_BANG_(reconciler))){
var f = (function (){
return om.next.protocols.reconcile_BANG_(reconciler);
});
if(cljs.core.fn_QMARK_(om.next._STAR_raf_STAR_)){
return (om.next._STAR_raf_STAR_.cljs$core$IFn$_invoke$arity$1 ? om.next._STAR_raf_STAR_.cljs$core$IFn$_invoke$arity$1(f) : om.next._STAR_raf_STAR_.call(null,f));
} else {
if(!(typeof requestAnimationFrame !== 'undefined')){
return setTimeout(f,(16));
} else {
return requestAnimationFrame(f);

}
}
} else {
return null;
}
});
om.next.schedule_sends_BANG_ = (function om$next$schedule_sends_BANG_(reconciler){
if(cljs.core.truth_(om.next.protocols.schedule_sends_BANG_(reconciler))){
var G__23098 = (function (){
return om.next.protocols.send_BANG_(reconciler);
});
var G__23099 = (0);
return setTimeout(G__23098,G__23099);
} else {
return null;
}
});
/**
 * Given a root component class and a target root DOM node, instantiate and
 * render the root class using the reconciler's :state property. The reconciler
 * will continue to observe changes to :state and keep the target node in sync.
 * Note a reconciler may have only one root. If invoked on a reconciler with an
 * existing root, the new root will replace the old one.
 */
om.next.add_root_BANG_ = (function om$next$add_root_BANG_(var_args){
var args23103 = [];
var len__7296__auto___23109 = arguments.length;
var i__7297__auto___23110 = (0);
while(true){
if((i__7297__auto___23110 < len__7296__auto___23109)){
args23103.push((arguments[i__7297__auto___23110]));

var G__23111 = (i__7297__auto___23110 + (1));
i__7297__auto___23110 = G__23111;
continue;
} else {
}
break;
}

var G__23107 = args23103.length;
switch (G__23107) {
case 3:
return om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23103.length)].join('')));

}
});

om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (reconciler,root_class,target){
return om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$4(reconciler,root_class,target,null);
});

om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (reconciler,root_class,target,options){
if(cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(reconciler) : om.next.reconciler_QMARK_.call(null,reconciler)))){
} else {
throw (new Error("Assert failed: (reconciler? reconciler)"));
}

if(cljs.core.fn_QMARK_(root_class)){
} else {
throw (new Error("Assert failed: (fn? root-class)"));
}

var temp__4657__auto___23113 = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(om.next.roots) : cljs.core.deref.call(null,om.next.roots)),target);
if(cljs.core.truth_(temp__4657__auto___23113)){
var old_reconciler_23114 = temp__4657__auto___23113;
(om.next.remove_root_BANG_.cljs$core$IFn$_invoke$arity$2 ? om.next.remove_root_BANG_.cljs$core$IFn$_invoke$arity$2(old_reconciler_23114,target) : om.next.remove_root_BANG_.call(null,old_reconciler_23114,target));
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(om.next.roots,cljs.core.assoc,target,reconciler);

return om.next.protocols.add_root_BANG_(reconciler,root_class,target,options);
});

om.next.add_root_BANG_.cljs$lang$maxFixedArity = 4;

/**
 * Remove a root target (a DOM element) from a reconciler. The reconciler will
 * no longer attempt to reconcile application state with the specified root.
 */
om.next.remove_root_BANG_ = (function om$next$remove_root_BANG_(reconciler,target){
return om.next.protocols.remove_root_BANG_(reconciler,target);
});

/**
 * @interface
 */
om.next.ITxIntercept = function(){};

/**
 * An optional protocol that component may implement to intercept child
 *   transactions.
 */
om.next.tx_intercept = (function om$next$tx_intercept(c,tx){
if((!((c == null))) && (!((c.om$next$ITxIntercept$tx_intercept$arity$2 == null)))){
return c.om$next$ITxIntercept$tx_intercept$arity$2(c,tx);
} else {
var x__6884__auto__ = (((c == null))?null:c);
var m__6885__auto__ = (om.next.tx_intercept[goog.typeOf(x__6884__auto__)]);
if(!((m__6885__auto__ == null))){
return (m__6885__auto__.cljs$core$IFn$_invoke$arity$2 ? m__6885__auto__.cljs$core$IFn$_invoke$arity$2(c,tx) : m__6885__auto__.call(null,c,tx));
} else {
var m__6885__auto____$1 = (om.next.tx_intercept["_"]);
if(!((m__6885__auto____$1 == null))){
return (m__6885__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__6885__auto____$1.cljs$core$IFn$_invoke$arity$2(c,tx) : m__6885__auto____$1.call(null,c,tx));
} else {
throw cljs.core.missing_protocol("ITxIntercept.tx-intercept",c);
}
}
}
});

om.next.to_env = (function om$next$to_env(x){
var config = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(x):x);
return cljs.core.select_keys(config,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$state,cljs.core.cst$kw$shared,cljs.core.cst$kw$parser,cljs.core.cst$kw$logger,cljs.core.cst$kw$pathopt], null));
});
om.next.transact_STAR_ = (function om$next$transact_STAR_(r,c,ref,tx){
var cfg = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(r);
var ref__$1 = (cljs.core.truth_((function (){var and__6209__auto__ = c;
if(cljs.core.truth_(and__6209__auto__)){
var and__6209__auto____$1 = ((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false);
if(and__6209__auto____$1){
return cljs.core.not(ref);
} else {
return and__6209__auto____$1;
}
} else {
return and__6209__auto__;
}
})())?om.next.ident(c,om.next.props(c)):ref);
var env = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([om.next.to_env(cfg),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$reconciler,r,cljs.core.cst$kw$component,c], null),(cljs.core.truth_(ref__$1)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ref,ref__$1], null):null)], 0));
var id = cljs.core.random_uuid();
var _ = cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cfg).add(id,(function (){var G__23151 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cfg);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23151) : cljs.core.deref.call(null,G__23151));
})());
var ___$1 = (function (){var temp__4657__auto__ = cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(cfg);
if(cljs.core.truth_(temp__4657__auto__)){
var l = temp__4657__auto__;
var G__23152 = l;
var G__23153 = [cljs.core.str((cljs.core.truth_(ref__$1)?[cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ref__$1], 0))),cljs.core.str(" ")].join(''):null)),cljs.core.str("transacted '"),cljs.core.str(tx),cljs.core.str(", "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([id], 0)))].join('');
return goog.log.info(G__23152,G__23153);
} else {
return null;
}
})();
var v = cljs.core.cst$kw$parser.cljs$core$IFn$_invoke$arity$1(cfg).call(null,env,tx);
var snds = om.next.gather_sends(env,tx,cljs.core.cst$kw$remotes.cljs$core$IFn$_invoke$arity$1(cfg));
var q = (function (){var G__23156 = cljs.core.PersistentVector.EMPTY;
var G__23156__$1 = ((!((c == null)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__23156,c):G__23156);
if(!((ref__$1 == null))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__23156__$1,ref__$1);
} else {
return G__23156__$1;
}
})();
om.next.protocols.queue_BANG_(r,cljs.core.into.cljs$core$IFn$_invoke$arity$3(q,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol_QMARK_),cljs.core.keys(v)));

if(cljs.core.empty_QMARK_(snds)){
return null;
} else {
om.next.protocols.queue_sends_BANG_(r,snds);

return om.next.schedule_sends_BANG_(r);
}
});
/**
 * Given a query expression annotate all mutations by adding a :mutator -> ident
 * entry to the metadata of each mutation expression in the query.
 */
om.next.annotate_mutations = (function om$next$annotate_mutations(tx,ident){
var annotate = (function om$next$annotate_mutations_$_annotate(expr,ident__$1){
var G__23173 = expr;
if(om.util.mutation_QMARK_(expr)){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(G__23173,cljs.core.assoc,cljs.core.cst$kw$mutator,ident__$1);
} else {
return G__23173;
}
});
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__23165_SHARP_){
return annotate(p1__23165_SHARP_,ident);
})),tx);
});
/**
 * Given a reconciler or component run a transaction. tx is a parse expression
 * that should include mutations followed by any necessary read. The reads will
 * be used to trigger component re-rendering.
 * 
 * Example:
 * 
 *   (om/transact! widget
 *     '[(do/this!) (do/that!)
 *       :read/this :read/that])
 */
om.next.transact_BANG_ = (function om$next$transact_BANG_(var_args){
var args23174 = [];
var len__7296__auto___23196 = arguments.length;
var i__7297__auto___23197 = (0);
while(true){
if((i__7297__auto___23197 < len__7296__auto___23196)){
args23174.push((arguments[i__7297__auto___23197]));

var G__23198 = (i__7297__auto___23197 + (1));
i__7297__auto___23197 = G__23198;
continue;
} else {
}
break;
}

var G__23176 = args23174.length;
switch (G__23176) {
case 2:
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23174.length)].join('')));

}
});

om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (x,tx){
if(cljs.core.truth_((function (){var or__6221__auto__ = om.next.component_QMARK_(x);
if(or__6221__auto__){
return or__6221__auto__;
} else {
return (om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x));
}
})())){
} else {
throw (new Error("Assert failed: (or (component? x) (reconciler? x))"));
}

if(cljs.core.vector_QMARK_(tx)){
} else {
throw (new Error("Assert failed: (vector? tx)"));
}

var tx__$1 = (function (){var G__23183 = tx;
if((function (){var and__6209__auto__ = om.next.component_QMARK_(x);
if(and__6209__auto__){
if(!((x == null))){
if((false) || (x.om$next$Ident$)){
return true;
} else {
if((!x.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(om.next.Ident,x);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(om.next.Ident,x);
}
} else {
return and__6209__auto__;
}
})()){
return om.next.annotate_mutations(G__23183,om.next.get_ident(x));
} else {
return G__23183;
}
})();
if(cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))){
return om.next.transact_STAR_(x,null,null,tx__$1);
} else {
if(om.next.iquery_QMARK_(x)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("transact! invoked by component "),cljs.core.str(x),cljs.core.str(" that does not implement IQuery")].join('')),cljs.core.str("\n"),cljs.core.str("(iquery? x)")].join('')));
}

var p = om.next.parent(x);
var x__$1 = x;
var tx__$2 = tx__$1;
while(true){
if((p == null)){
var r = om.next.get_reconciler(x__$1);
return om.next.transact_STAR_(r,x__$1,null,om.next.transform_reads(r,tx__$2));
} else {
var vec__23192 = ((((!((p == null)))?(((false) || (p.om$next$ITxIntercept$))?true:false):false))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,om.next.tx_intercept(p,tx__$2)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x__$1,tx__$2], null));
var x_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23192,(0),null);
var tx__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23192,(1),null);
var G__23249 = om.next.parent(p);
var G__23250 = x_SINGLEQUOTE_;
var G__23251 = tx__$3;
p = G__23249;
x__$1 = G__23250;
tx__$2 = G__23251;
continue;
}
break;
}
}
});

om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (r,ref,tx){
return om.next.transact_STAR_(r,null,ref,tx);
});

om.next.transact_BANG_.cljs$lang$maxFixedArity = 3;

/**
 * Create a parser. The argument is a map of two keys, :read and :mutate. Both
 * functions should have the signature (Env -> Key -> Params -> ParseResult).
 */
om.next.parser = (function om$next$parser(p__23253){
var map__23256 = p__23253;
var map__23256__$1 = ((((!((map__23256 == null)))?((((map__23256.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23256.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23256):map__23256);
var opts = map__23256__$1;
var read = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23256__$1,cljs.core.cst$kw$read);
var mutate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23256__$1,cljs.core.cst$kw$mutate);
if(cljs.core.map_QMARK_(opts)){
} else {
throw (new Error("Assert failed: (map? opts)"));
}

return om.next.impl.parser.parser(opts);
});
/**
 * Helper function for implementing :read and :mutate as multimethods. Use this
 * as the dispatch-fn.
 */
om.next.dispatch = (function om$next$dispatch(_,key,___$1){
return key;
});
/**
 * Given a query expression convert it into an AST.
 */
om.next.query__GT_ast = (function om$next$query__GT_ast(query_expr){
return om.next.impl.parser.query__GT_ast(query_expr);
});
om.next.ast__GT_query = (function om$next$ast__GT_query(query_ast){

return om.next.impl.parser.ast__GT_expr.cljs$core$IFn$_invoke$arity$2(query_ast,true);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {om.next.protocols.IIndexer}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
om.next.Indexer = (function (indexes,extfs,__meta,__extmap,__hash){
this.indexes = indexes;
this.extfs = extfs;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229700362;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
om.next.Indexer.prototype.om$next$protocols$IIndexer$ = true;

om.next.Indexer.prototype.om$next$protocols$IIndexer$index_root$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
var prop__GT_classes = (function (){var G__23264 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23264) : cljs.core.atom.call(null,G__23264));
})();
var class_path__GT_query = (function (){var G__23265 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23265) : cljs.core.atom.call(null,G__23265));
})();
var rootq = om.next.get_query(x);
var class$ = (function (){var G__23266 = x;
if(om.next.component_QMARK_(x)){
return cljs.core.type(G__23266);
} else {
return G__23266;
}
})();
var get_dispatch_key = ((function (prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function om$next$get_dispatch_key(prop){
var G__23379 = prop;
if((!(om.util.ident_QMARK_(prop))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.second(prop),cljs.core.cst$sym$_))){
return cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$dispatch_DASH_key,om.next.impl.parser.expr__GT_ast).call(null,G__23379);
} else {
return G__23379;
}
});})(prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
;
var build_index_STAR_ = ((function (prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function om$next$build_index_STAR_(class$__$1,query,path,classpath){
var l__21958__auto___23508 = om.next._STAR_logger_STAR_;
if((!(om.next.iquery_QMARK_(class$__$1))) || ((om.next.iquery_QMARK_(class$__$1)) && (!(cljs.core.empty_QMARK_(query))))){
} else {
var G__23438_23528 = l__21958__auto___23508;
var G__23439_23529 = [cljs.core.str("Invariant Violation"),cljs.core.str(((("build-index*" == null))?null:[cljs.core.str(" (in function: `"),cljs.core.str("build-index*"),cljs.core.str("`)")].join(''))),cljs.core.str(": "),cljs.core.str([cljs.core.str("`IQuery` implementation must return a non-empty query."),cljs.core.str(" Check the `IQuery` implementation of component `"),cljs.core.str(((om.next.component_QMARK_(class$__$1))?class$__$1.constructor.displayName:class$__$1.prototype.constructor.displayName)),cljs.core.str("`.")].join(''))].join('');
goog.log.error(G__23438_23528,G__23439_23529);
}

var recursive_QMARK_ = cljs.core.some(cljs.core.PersistentHashSet.fromArray([class$__$1], true),classpath);
var classpath__$1 = (function (){var G__23440 = classpath;
if((!((class$__$1 == null))) && (cljs.core.not(recursive_QMARK_))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__23440,class$__$1);
} else {
return G__23440;
}
})();
if(cljs.core.truth_(class$__$1)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(class_path__GT_query,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [classpath__$1], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.array_seq([om.next.query_template(om.next.focus_query(rootq,path),path)], 0));
} else {
}

if(cljs.core.truth_(recursive_QMARK_)){
return null;
} else {
if(cljs.core.vector_QMARK_(query)){
var map__23441 = cljs.core.group_by(om.util.join_QMARK_,query);
var map__23441__$1 = ((((!((map__23441 == null)))?((((map__23441.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23441.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23441):map__23441);
var props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23441__$1,false);
var joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23441__$1,true);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(prop__GT_classes,((function (map__23441,map__23441__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function (p1__23258_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__23258_SHARP_,cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(get_dispatch_key,props),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.fromArray([class$__$1], true)))], 0));
});})(map__23441,map__23441__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
);

var seq__23443 = cljs.core.seq(joins);
var chunk__23444 = null;
var count__23445 = (0);
var i__23446 = (0);
while(true){
if((i__23446 < count__23445)){
var join = chunk__23444.cljs$core$IIndexed$_nth$arity$2(null,i__23446);
var vec__23447_23553 = om.util.join_entry(join);
var prop_23554 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23447_23553,(0),null);
var query_SINGLEQUOTE__23555 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23447_23553,(1),null);
var prop_dispatch_key_23556 = get_dispatch_key(prop_23554);
var recursion_QMARK__23557 = om.util.recursion_QMARK_(query_SINGLEQUOTE__23555);
var query_SINGLEQUOTE__23558__$1 = ((recursion_QMARK__23557)?query:query_SINGLEQUOTE__23555);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(prop__GT_classes,((function (seq__23443,chunk__23444,count__23445,i__23446,vec__23447_23553,prop_23554,query_SINGLEQUOTE__23555,prop_dispatch_key_23556,recursion_QMARK__23557,query_SINGLEQUOTE__23558__$1,join,map__23441,map__23441__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function (p1__23259_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__23259_SHARP_,cljs.core.PersistentArrayMap.fromArray([prop_dispatch_key_23556,cljs.core.PersistentHashSet.fromArray([class$__$1], true)], true, false)], 0));
});})(seq__23443,chunk__23444,count__23445,i__23446,vec__23447_23553,prop_23554,query_SINGLEQUOTE__23555,prop_dispatch_key_23556,recursion_QMARK__23557,query_SINGLEQUOTE__23558__$1,join,map__23441,map__23441__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
);

var class_SINGLEQUOTE__23561 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE__23558__$1));
if((recursion_QMARK__23557) && ((class_SINGLEQUOTE__23561 == null))){
} else {
om$next$build_index_STAR_(class_SINGLEQUOTE__23561,query_SINGLEQUOTE__23558__$1,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop_23554),classpath__$1);
}

var G__23570 = seq__23443;
var G__23571 = chunk__23444;
var G__23572 = count__23445;
var G__23573 = (i__23446 + (1));
seq__23443 = G__23570;
chunk__23444 = G__23571;
count__23445 = G__23572;
i__23446 = G__23573;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__23443);
if(temp__4657__auto__){
var seq__23443__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23443__$1)){
var c__7032__auto__ = cljs.core.chunk_first(seq__23443__$1);
var G__23575 = cljs.core.chunk_rest(seq__23443__$1);
var G__23576 = c__7032__auto__;
var G__23577 = cljs.core.count(c__7032__auto__);
var G__23578 = (0);
seq__23443 = G__23575;
chunk__23444 = G__23576;
count__23445 = G__23577;
i__23446 = G__23578;
continue;
} else {
var join = cljs.core.first(seq__23443__$1);
var vec__23455_23579 = om.util.join_entry(join);
var prop_23580 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23455_23579,(0),null);
var query_SINGLEQUOTE__23581 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23455_23579,(1),null);
var prop_dispatch_key_23582 = get_dispatch_key(prop_23580);
var recursion_QMARK__23583 = om.util.recursion_QMARK_(query_SINGLEQUOTE__23581);
var query_SINGLEQUOTE__23584__$1 = ((recursion_QMARK__23583)?query:query_SINGLEQUOTE__23581);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(prop__GT_classes,((function (seq__23443,chunk__23444,count__23445,i__23446,vec__23455_23579,prop_23580,query_SINGLEQUOTE__23581,prop_dispatch_key_23582,recursion_QMARK__23583,query_SINGLEQUOTE__23584__$1,join,seq__23443__$1,temp__4657__auto__,map__23441,map__23441__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function (p1__23259_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__23259_SHARP_,cljs.core.PersistentArrayMap.fromArray([prop_dispatch_key_23582,cljs.core.PersistentHashSet.fromArray([class$__$1], true)], true, false)], 0));
});})(seq__23443,chunk__23444,count__23445,i__23446,vec__23455_23579,prop_23580,query_SINGLEQUOTE__23581,prop_dispatch_key_23582,recursion_QMARK__23583,query_SINGLEQUOTE__23584__$1,join,seq__23443__$1,temp__4657__auto__,map__23441,map__23441__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
);

var class_SINGLEQUOTE__23585 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE__23584__$1));
if((recursion_QMARK__23583) && ((class_SINGLEQUOTE__23585 == null))){
} else {
om$next$build_index_STAR_(class_SINGLEQUOTE__23585,query_SINGLEQUOTE__23584__$1,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop_23580),classpath__$1);
}

var G__23586 = cljs.core.next(seq__23443__$1);
var G__23587 = null;
var G__23588 = (0);
var G__23589 = (0);
seq__23443 = G__23586;
chunk__23444 = G__23587;
count__23445 = G__23588;
i__23446 = G__23589;
continue;
}
} else {
return null;
}
}
break;
}
} else {
if(cljs.core.map_QMARK_(query)){
var seq__23458 = cljs.core.seq(query);
var chunk__23459 = null;
var count__23460 = (0);
var i__23461 = (0);
while(true){
if((i__23461 < count__23460)){
var vec__23462 = chunk__23459.cljs$core$IIndexed$_nth$arity$2(null,i__23461);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23462,(0),null);
var query_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23462,(1),null);
var class_SINGLEQUOTE__23590 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE_));
om$next$build_index_STAR_(class_SINGLEQUOTE__23590,query_SINGLEQUOTE_,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop),classpath__$1);

var G__23591 = seq__23458;
var G__23592 = chunk__23459;
var G__23593 = count__23460;
var G__23594 = (i__23461 + (1));
seq__23458 = G__23591;
chunk__23459 = G__23592;
count__23460 = G__23593;
i__23461 = G__23594;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__23458);
if(temp__4657__auto__){
var seq__23458__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__23458__$1)){
var c__7032__auto__ = cljs.core.chunk_first(seq__23458__$1);
var G__23595 = cljs.core.chunk_rest(seq__23458__$1);
var G__23596 = c__7032__auto__;
var G__23597 = cljs.core.count(c__7032__auto__);
var G__23598 = (0);
seq__23458 = G__23595;
chunk__23459 = G__23596;
count__23460 = G__23597;
i__23461 = G__23598;
continue;
} else {
var vec__23465 = cljs.core.first(seq__23458__$1);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23465,(0),null);
var query_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23465,(1),null);
var class_SINGLEQUOTE__23601 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE_));
om$next$build_index_STAR_(class_SINGLEQUOTE__23601,query_SINGLEQUOTE_,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop),classpath__$1);

var G__23604 = cljs.core.next(seq__23458__$1);
var G__23605 = null;
var G__23606 = (0);
var G__23607 = (0);
seq__23458 = G__23604;
chunk__23459 = G__23605;
count__23460 = G__23606;
i__23461 = G__23607;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
}
});})(prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
;
build_index_STAR_(class$,rootq,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.indexes,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$prop_DASH__GT_classes,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(prop__GT_classes) : cljs.core.deref.call(null,prop__GT_classes)),cljs.core.cst$kw$class_DASH_path_DASH__GT_query,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(class_path__GT_query) : cljs.core.deref.call(null,class_path__GT_query))], null));
});

om.next.Indexer.prototype.om$next$protocols$IIndexer$index_component_BANG_$arity$2 = (function (_,c){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.indexes,((function (___$1){
return (function (indexes__$1){
var indexes__$2 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$index_DASH_component.cljs$core$IFn$_invoke$arity$1(self__.extfs).call(null,indexes__$1,c),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,cljs.core.type(c)], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),c);
var ident = ((((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false))?(function (){var ident = om.next.ident(c,om.next.props(c));
var l__21958__auto___23615 = om.next._STAR_logger_STAR_;
if(om.util.ident_QMARK_(ident)){
} else {
var G__23478_23616 = l__21958__auto___23615;
var G__23479_23617 = [cljs.core.str("Invariant Violation"),cljs.core.str((((null == null))?null:[cljs.core.str(" (in function: `"),cljs.core.str(null),cljs.core.str("`)")].join(''))),cljs.core.str(": "),cljs.core.str([cljs.core.str("malformed Ident. An ident must be a vector of "),cljs.core.str("two elements (a keyword and an EDN value). Check "),cljs.core.str("the Ident implementation of component `"),cljs.core.str(c.constructor.displayName),cljs.core.str("`.")].join(''))].join('');
goog.log.error(G__23478_23616,G__23479_23617);
}

return ident;
})():null);
if(!((ident == null))){
var G__23480 = indexes__$2;
if(cljs.core.truth_(ident)){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__23480,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ref_DASH__GT_components,ident], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),c);
} else {
return G__23480;
}
} else {
return indexes__$2;
}
});})(___$1))
);
});

om.next.Indexer.prototype.om$next$protocols$IIndexer$drop_component_BANG_$arity$2 = (function (_,c){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.indexes,((function (___$1){
return (function (indexes__$1){
var indexes__$2 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$drop_DASH_component.cljs$core$IFn$_invoke$arity$1(self__.extfs).call(null,indexes__$1,c),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,cljs.core.type(c)], null),cljs.core.disj,c);
var ident = ((((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false))?om.next.ident(c,om.next.props(c)):null);
if(!((ident == null))){
var G__23482 = indexes__$2;
if(cljs.core.truth_(ident)){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__23482,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ref_DASH__GT_components,ident], null),cljs.core.disj,c);
} else {
return G__23482;
}
} else {
return indexes__$2;
}
});})(___$1))
);
});

om.next.Indexer.prototype.om$next$protocols$IIndexer$key__GT_components$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
var indexes__$1 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.indexes) : cljs.core.deref.call(null,self__.indexes));
if(om.next.component_QMARK_(k)){
return cljs.core.PersistentHashSet.fromArray([k], true);
} else {
var temp__4655__auto__ = cljs.core.cst$kw$ref_DASH__GT_components.cljs$core$IFn$_invoke$arity$1(self__.extfs).call(null,indexes__$1,k);
if(cljs.core.truth_(temp__4655__auto__)){
var cs = temp__4655__auto__;
return cs;
} else {
var cs = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ref_DASH__GT_components,k], null),cljs.core.cst$kw$om$next_SLASH_not_DASH_found);
if(!(cljs.core.keyword_identical_QMARK_(cljs.core.cst$kw$om$next_SLASH_not_DASH_found,cs))){
return cs;
} else {
if((k instanceof cljs.core.Keyword)){
var cs__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prop_DASH__GT_classes,k], null));
return cljs.core.transduce.cljs$core$IFn$_invoke$arity$4(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (cs__$1,cs,temp__4655__auto__,indexes__$1,___$1){
return (function (p1__23260_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,p1__23260_SHARP_], null));
});})(cs__$1,cs,temp__4655__auto__,indexes__$1,___$1))
),cljs.core.completing.cljs$core$IFn$_invoke$arity$1(cljs.core.into),cljs.core.PersistentHashSet.EMPTY,cs__$1);
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
}
}
}
});

om.next.Indexer.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__6843__auto__,k__6844__auto__){
var self__ = this;
var this__6843__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__6843__auto____$1,k__6844__auto__,null);
});

om.next.Indexer.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__6845__auto__,k23262,else__6846__auto__){
var self__ = this;
var this__6845__auto____$1 = this;
var G__23483 = (((k23262 instanceof cljs.core.Keyword))?k23262.fqn:null);
switch (G__23483) {
case "indexes":
return self__.indexes;

break;
case "extfs":
return self__.extfs;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k23262,else__6846__auto__);

}
});

om.next.Indexer.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__6857__auto__,writer__6858__auto__,opts__6859__auto__){
var self__ = this;
var this__6857__auto____$1 = this;
var pr_pair__6860__auto__ = ((function (this__6857__auto____$1){
return (function (keyval__6861__auto__){
return cljs.core.pr_sequential_writer(writer__6858__auto__,cljs.core.pr_writer,""," ","",opts__6859__auto__,keyval__6861__auto__);
});})(this__6857__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__6858__auto__,pr_pair__6860__auto__,"#om.next.Indexer{",", ","}",opts__6859__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$indexes,self__.indexes],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$extfs,self__.extfs],null))], null),self__.__extmap));
});

om.next.Indexer.prototype.cljs$core$IIterable$ = true;

om.next.Indexer.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__23261){
var self__ = this;
var G__23261__$1 = this;
return (new cljs.core.RecordIter((0),G__23261__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$indexes,cljs.core.cst$kw$extfs], null),cljs.core._iterator(self__.__extmap)));
});

om.next.Indexer.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__6841__auto__){
var self__ = this;
var this__6841__auto____$1 = this;
return self__.__meta;
});

om.next.Indexer.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__6837__auto__){
var self__ = this;
var this__6837__auto____$1 = this;
return (new om.next.Indexer(self__.indexes,self__.extfs,self__.__meta,self__.__extmap,self__.__hash));
});

om.next.Indexer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__6847__auto__){
var self__ = this;
var this__6847__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

om.next.Indexer.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__6838__auto__){
var self__ = this;
var this__6838__auto____$1 = this;
var h__6656__auto__ = self__.__hash;
if(!((h__6656__auto__ == null))){
return h__6656__auto__;
} else {
var h__6656__auto____$1 = cljs.core.hash_imap(this__6838__auto____$1);
self__.__hash = h__6656__auto____$1;

return h__6656__auto____$1;
}
});

om.next.Indexer.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__6839__auto__,other__6840__auto__){
var self__ = this;
var this__6839__auto____$1 = this;
if(cljs.core.truth_((function (){var and__6209__auto__ = other__6840__auto__;
if(cljs.core.truth_(and__6209__auto__)){
var and__6209__auto____$1 = (this__6839__auto____$1.constructor === other__6840__auto__.constructor);
if(and__6209__auto____$1){
return cljs.core.equiv_map(this__6839__auto____$1,other__6840__auto__);
} else {
return and__6209__auto____$1;
}
} else {
return and__6209__auto__;
}
})())){
return true;
} else {
return false;
}
});

om.next.Indexer.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__6852__auto__,k__6853__auto__){
var self__ = this;
var this__6852__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$extfs,null,cljs.core.cst$kw$indexes,null], null), null),k__6853__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__6852__auto____$1),self__.__meta),k__6853__auto__);
} else {
return (new om.next.Indexer(self__.indexes,self__.extfs,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__6853__auto__)),null));
}
});

om.next.Indexer.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__6850__auto__,k__6851__auto__,G__23261){
var self__ = this;
var this__6850__auto____$1 = this;
var pred__23486 = cljs.core.keyword_identical_QMARK_;
var expr__23487 = k__6851__auto__;
if(cljs.core.truth_((pred__23486.cljs$core$IFn$_invoke$arity$2 ? pred__23486.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$indexes,expr__23487) : pred__23486.call(null,cljs.core.cst$kw$indexes,expr__23487)))){
return (new om.next.Indexer(G__23261,self__.extfs,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__23486.cljs$core$IFn$_invoke$arity$2 ? pred__23486.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$extfs,expr__23487) : pred__23486.call(null,cljs.core.cst$kw$extfs,expr__23487)))){
return (new om.next.Indexer(self__.indexes,G__23261,self__.__meta,self__.__extmap,null));
} else {
return (new om.next.Indexer(self__.indexes,self__.extfs,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__6851__auto__,G__23261),null));
}
}
});

om.next.Indexer.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__6855__auto__){
var self__ = this;
var this__6855__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$indexes,self__.indexes],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$extfs,self__.extfs],null))], null),self__.__extmap));
});

om.next.Indexer.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__6842__auto__,G__23261){
var self__ = this;
var this__6842__auto____$1 = this;
return (new om.next.Indexer(self__.indexes,self__.extfs,G__23261,self__.__extmap,self__.__hash));
});

om.next.Indexer.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__6848__auto__,entry__6849__auto__){
var self__ = this;
var this__6848__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__6849__auto__)){
return cljs.core._assoc(this__6848__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__6849__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__6849__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__6848__auto____$1,entry__6849__auto__);
}
});

om.next.Indexer.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.indexes) : cljs.core.deref.call(null,self__.indexes));
});

om.next.Indexer.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$indexes,cljs.core.cst$sym$extfs], null);
});

om.next.Indexer.cljs$lang$type = true;

om.next.Indexer.cljs$lang$ctorPrSeq = (function (this__6877__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"om.next/Indexer");
});

om.next.Indexer.cljs$lang$ctorPrWriter = (function (this__6877__auto__,writer__6878__auto__){
return cljs.core._write(writer__6878__auto__,"om.next/Indexer");
});

om.next.__GT_Indexer = (function om$next$__GT_Indexer(indexes,extfs){
return (new om.next.Indexer(indexes,extfs,null,null,null));
});

om.next.map__GT_Indexer = (function om$next$map__GT_Indexer(G__23263){
return (new om.next.Indexer(cljs.core.cst$kw$indexes.cljs$core$IFn$_invoke$arity$1(G__23263),cljs.core.cst$kw$extfs.cljs$core$IFn$_invoke$arity$1(G__23263),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__23263,cljs.core.cst$kw$indexes,cljs.core.array_seq([cljs.core.cst$kw$extfs], 0)),null));
});

/**
 * Given a function (Component -> Ref), return an indexer.
 */
om.next.indexer = (function om$next$indexer(var_args){
var args23642 = [];
var len__7296__auto___23646 = arguments.length;
var i__7297__auto___23647 = (0);
while(true){
if((i__7297__auto___23647 < len__7296__auto___23646)){
args23642.push((arguments[i__7297__auto___23647]));

var G__23648 = (i__7297__auto___23647 + (1));
i__7297__auto___23647 = G__23648;
continue;
} else {
}
break;
}

var G__23644 = args23642.length;
switch (G__23644) {
case 0:
return om.next.indexer.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return om.next.indexer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23642.length)].join('')));

}
});

om.next.indexer.cljs$core$IFn$_invoke$arity$0 = (function (){
return om.next.indexer.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$index_DASH_component,(function (indexes,component){
return indexes;
}),cljs.core.cst$kw$drop_DASH_component,(function (indexes,component){
return indexes;
}),cljs.core.cst$kw$ref_DASH__GT_components,(function (indexes,ref){
return null;
})], null));
});

om.next.indexer.cljs$core$IFn$_invoke$arity$1 = (function (extfs){
return (new om.next.Indexer((function (){var G__23645 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class_DASH__GT_components,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$ref_DASH__GT_components,cljs.core.PersistentArrayMap.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23645) : cljs.core.atom.call(null,G__23645));
})(),extfs,null,null,null));
});

om.next.indexer.cljs$lang$maxFixedArity = 1;

/**
 * PRIVATE: Get the indexer associated with the reconciler.
 */
om.next.get_indexer = (function om$next$get_indexer(reconciler){
if(cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(reconciler) : om.next.reconciler_QMARK_.call(null,reconciler)))){
} else {
throw (new Error("Assert failed: (reconciler? reconciler)"));
}

return cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler));
});
/**
 * Return all components for a given ref.
 */
om.next.ref__GT_components = (function om$next$ref__GT_components(x,ref){
if((ref == null)){
return null;
} else {
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
return om.next.protocols.key__GT_components(indexer,ref);
}
});
/**
 * Get any component from the indexer that matches the ref.
 */
om.next.ref__GT_any = (function om$next$ref__GT_any(x,ref){
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
return cljs.core.first(om.next.protocols.key__GT_components(indexer,ref));
});
/**
 * Get any component from the indexer that matches the component class.
 */
om.next.class__GT_any = (function om$next$class__GT_any(x,class$){
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
return cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(indexer) : cljs.core.deref.call(null,indexer)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,class$], null)));
});
/**
 * Given x (a reconciler or indexer) and y (a component or component class
 * path), return the queries for that path.
 */
om.next.class_path__GT_queries = (function om$next$class_path__GT_queries(x,y){
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
var cp = ((om.next.component_QMARK_(y))?om.next.class_path(y):y);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(clojure.zip.root),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(indexer) : cljs.core.deref.call(null,indexer)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH_path_DASH__GT_query,cp], null)));
});
/**
 * Returns the absolute query for a given component, not relative like
 * om.next/get-query.
 */
om.next.full_query = (function om$next$full_query(var_args){
var args23680 = [];
var len__7296__auto___23686 = arguments.length;
var i__7297__auto___23687 = (0);
while(true){
if((i__7297__auto___23687 < len__7296__auto___23686)){
args23680.push((arguments[i__7297__auto___23687]));

var G__23688 = (i__7297__auto___23687 + (1));
i__7297__auto___23687 = G__23688;
continue;
} else {
}
break;
}

var G__23683 = args23680.length;
switch (G__23683) {
case 1:
return om.next.full_query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.full_query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23680.length)].join('')));

}
});

om.next.full_query.cljs$core$IFn$_invoke$arity$1 = (function (component){
if(om.next.iquery_QMARK_(component)){
if((om.next.path(component) == null)){
return om.next.replace(cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((function (){var G__23684 = om.next.get_indexer(om.next.get_reconciler(component));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23684) : cljs.core.deref.call(null,G__23684));
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH_path_DASH__GT_query,om.next.class_path(component)], null))),om.next.get_query(component));
} else {
return om.next.full_query.cljs$core$IFn$_invoke$arity$2(component,om.next.get_query(component));
}
} else {
return null;
}
});

om.next.full_query.cljs$core$IFn$_invoke$arity$2 = (function (component,query){
if(om.next.iquery_QMARK_(component)){
var path_SINGLEQUOTE_ = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.number_QMARK_),om.next.path(component));
var cp = om.next.class_path(component);
var qs = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((function (){var G__23685 = om.next.get_indexer(om.next.get_reconciler(component));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__23685) : cljs.core.deref.call(null,G__23685));
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH_path_DASH__GT_query,cp], null));
if(!(cljs.core.empty_QMARK_(qs))){
var q = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (path_SINGLEQUOTE_,cp,qs){
return (function (p1__23677_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(path_SINGLEQUOTE_,om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$2(clojure.zip.root(p1__23677_SHARP_),path_SINGLEQUOTE_));
});})(path_SINGLEQUOTE_,cp,qs))
,qs));
if(!((q == null))){
return om.next.replace(q,query);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("No queries exist for component path "),cljs.core.str(cp),cljs.core.str(" or data path "),cljs.core.str(path_SINGLEQUOTE_)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$om$next_SLASH_no_DASH_queries], null));
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("No queries exist for component path "),cljs.core.str(cp)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$om$next_SLASH_no_DASH_queries], null));
}
} else {
return null;
}
});

om.next.full_query.cljs$lang$maxFixedArity = 2;

om.next.to_class = (function om$next$to_class(class$){
if((class$ == null)){
return null;
} else {
if(!(((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))){
var G__23695 = class$.prototype;
return Object.create(G__23695);
} else {
return class$;
}
}
});
om.next.normalize_STAR_ = (function om$next$normalize_STAR_(query,data,refs,union_seen){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_STAR_], null),query)){
return data;
} else {
if(cljs.core.map_QMARK_(query)){
var class$ = om.next.to_class(cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query)));
var ident = ((((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))?om.next.ident(class$,data):null);
if(!((ident == null))){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(om$next$normalize_STAR_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(query,cljs.core.first(ident)),data,refs,union_seen),cljs.core.assoc,cljs.core.cst$kw$om_SLASH_tag,cljs.core.first(ident));
} else {
throw (new Error("Union components must implement Ident"));
}
} else {
if(cljs.core.vector_QMARK_(data)){
return data;
} else {
var q = cljs.core.seq(query);
var ret = data;
while(true){
if(!((q == null))){
var expr = cljs.core.first(q);
if(cljs.core.truth_(om.util.join_QMARK_(expr))){
var vec__23719 = om.util.join_entry(expr);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23719,(0),null);
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23719,(1),null);
var recursive_QMARK_ = om.util.recursion_QMARK_(sel);
var union_entry = ((om.util.union_QMARK_(expr))?sel:union_seen);
var sel__$1 = ((recursive_QMARK_)?((!((union_seen == null)))?union_seen:query):sel);
var class$ = om.next.to_class(cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sel__$1)));
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,k);
if((recursive_QMARK_) && (om.util.ident_QMARK_(v))){
var G__23730 = cljs.core.next(q);
var G__23731 = ret;
q = G__23730;
ret = G__23731;
continue;
} else {
if(cljs.core.map_QMARK_(v)){
var x = om$next$normalize_STAR_(sel__$1,v,refs,union_entry);
if(!(((class$ == null)) || (!(((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))))){
var i = om.next.ident(class$,v);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(refs,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(i),cljs.core.second(i)], null),cljs.core.merge,cljs.core.array_seq([x], 0));

var G__23732 = cljs.core.next(q);
var G__23733 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,i);
q = G__23732;
ret = G__23733;
continue;
} else {
var G__23734 = cljs.core.next(q);
var G__23735 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,x);
q = G__23734;
ret = G__23735;
continue;
}
} else {
if(cljs.core.vector_QMARK_(v)){
var xs = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (q,ret,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr){
return (function (p1__23696_SHARP_){
return om$next$normalize_STAR_(sel__$1,p1__23696_SHARP_,refs,union_entry);
});})(q,ret,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr))
),v);
if(!(((class$ == null)) || (!(((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))))){
var is = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (q,ret,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr){
return (function (p1__23697_SHARP_){
return om.next.ident(class$,p1__23697_SHARP_);
});})(q,ret,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr))
),xs);
if(cljs.core.vector_QMARK_(sel__$1)){
if(cljs.core.empty_QMARK_(is)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(refs,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.ffirst(is)], null),((function (q,ret,is,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr){
return (function (ys){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.merge,cljs.core.array_seq([ys,cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,is),xs)], 0));
});})(q,ret,is,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr))
);
}
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(refs,((function (q,ret,is,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr){
return (function (refs_SINGLEQUOTE_){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (q,ret,is,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr){
return (function (ret__$1,p__23726){
var vec__23727 = p__23726;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23727,(0),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23727,(1),null);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(ret__$1,i,cljs.core.merge,x);
});})(q,ret,is,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr))
,refs_SINGLEQUOTE_,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,is,xs));
});})(q,ret,is,xs,vec__23719,k,sel,recursive_QMARK_,union_entry,sel__$1,class$,v,expr))
);
}

var G__23739 = cljs.core.next(q);
var G__23740 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,is);
q = G__23739;
ret = G__23740;
continue;
} else {
var G__23741 = cljs.core.next(q);
var G__23742 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,xs);
q = G__23741;
ret = G__23742;
continue;
}
} else {
if((v == null)){
var G__23743 = cljs.core.next(q);
var G__23744 = ret;
q = G__23743;
ret = G__23744;
continue;
} else {
var G__23745 = cljs.core.next(q);
var G__23746 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,v);
q = G__23745;
ret = G__23746;
continue;

}
}
}
}
} else {
var k = ((cljs.core.seq_QMARK_(expr))?cljs.core.first(expr):expr);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,k);
if((v == null)){
var G__23747 = cljs.core.next(q);
var G__23748 = ret;
q = G__23747;
ret = G__23748;
continue;
} else {
var G__23749 = cljs.core.next(q);
var G__23750 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,v);
q = G__23749;
ret = G__23750;
continue;
}
}
} else {
return ret;
}
break;
}

}
}
}
});
/**
 * Given a Om component class or instance and a tree of data, use the component's
 * query to transform the tree into the default database format. All nodes that
 * can be mapped via Ident implementations wil be replaced with ident links. The
 * original node data will be moved into tables indexed by ident. If merge-idents
 * option is true, will return these tables in the result instead of as metadata.
 */
om.next.tree__GT_db = (function om$next$tree__GT_db(var_args){
var args23751 = [];
var len__7296__auto___23755 = arguments.length;
var i__7297__auto___23756 = (0);
while(true){
if((i__7297__auto___23756 < len__7296__auto___23755)){
args23751.push((arguments[i__7297__auto___23756]));

var G__23757 = (i__7297__auto___23756 + (1));
i__7297__auto___23756 = G__23757;
continue;
} else {
}
break;
}

var G__23753 = args23751.length;
switch (G__23753) {
case 2:
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23751.length)].join('')));

}
});

om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2 = (function (x,data){
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3(x,data,false);
});

om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3 = (function (x,data,merge_idents){
var refs = (function (){var G__23754 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__23754) : cljs.core.atom.call(null,G__23754));
})();
var x__$1 = ((cljs.core.vector_QMARK_(x))?x:om.next.get_query(x));
var ret = om.next.normalize_STAR_(x__$1,data,refs,null);
if(merge_idents){
var refs_SINGLEQUOTE_ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(refs) : cljs.core.deref.call(null,refs));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ret,refs_SINGLEQUOTE_], 0)),cljs.core.cst$kw$om$next_SLASH_tables,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.keys(refs_SINGLEQUOTE_)));
} else {
return cljs.core.with_meta(ret,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(refs) : cljs.core.deref.call(null,refs)));
}
});

om.next.tree__GT_db.cljs$lang$maxFixedArity = 3;

om.next.sift_idents = (function om$next$sift_idents(res){
var map__23762 = cljs.core.group_by((function (p1__23759_SHARP_){
return cljs.core.vector_QMARK_(cljs.core.first(p1__23759_SHARP_));
}),res);
var map__23762__$1 = ((((!((map__23762 == null)))?((((map__23762.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23762.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23762):map__23762);
var idents = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23762__$1,true);
var rest = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23762__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,idents),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,rest)], null);
});
/**
 * Changes a join on key k with depth limit from [:a {:k n}] to [:a {:k (dec n)}]
 */
om.next.reduce_query_depth = (function om$next$reduce_query_depth(q,k){
if(!(cljs.core.empty_QMARK_(om.next.focus_query(q,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null))))){
var pos = om.next.query_template(q,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null));
var node = clojure.zip.node(pos);
var node_SINGLEQUOTE_ = (function (){var G__23767 = node;
if(typeof node === 'number'){
return (G__23767 - (1));
} else {
return G__23767;
}
})();
return om.next.replace(pos,node_SINGLEQUOTE_);
} else {
return q;
}
});
/**
 * Given a union expression decrement each of the query roots by one if it
 * is recursive.
 */
om.next.reduce_union_recursion_depth = (function om$next$reduce_union_recursion_depth(union_expr,recursion_key){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__23776){
var vec__23777 = p__23776;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23777,(0),null);
var q = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23777,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,om.next.reduce_query_depth(q,recursion_key)], null);
}),union_expr));
});
/**
 * Denormalize a data based on query. refs is a data structure which maps idents
 * to their values. map-ident is a function taking a ident to another ident,
 * used during tempid transition. idents-seen is the set of idents encountered,
 * used to limit recursion. union-expr is the current union expression being
 * evaluated. recurse-key is key representing the current recursive query being
 * evaluted.
 */
om.next.denormalize_STAR_ = (function om$next$denormalize_STAR_(query,data,refs,map_ident,idents_seen,union_expr,recurse_key){
if(cljs.core.map_QMARK_(refs)){
} else {
throw (new Error("Assert failed: (map? refs)"));
}

var data__$1 = (function (){var G__23807 = data;
if(om.util.ident_QMARK_(data)){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(refs,(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(G__23807) : map_ident.call(null,G__23807)));
} else {
return G__23807;
}
})();
if(cljs.core.vector_QMARK_(data__$1)){
var step = ((function (data__$1){
return (function (ident){
var ident_SINGLEQUOTE_ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(refs,(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(ident) : map_ident.call(null,ident)));
var union_recur_QMARK_ = (function (){var and__6209__auto__ = union_expr;
if(cljs.core.truth_(and__6209__auto__)){
return recurse_key;
} else {
return and__6209__auto__;
}
})();
var query__$1 = (function (){var G__23808 = query;
if(cljs.core.truth_(union_recur_QMARK_)){
return om.next.reduce_union_recursion_depth(G__23808,recurse_key);
} else {
return G__23808;
}
})();
var union_seen_SINGLEQUOTE_ = (function (){var G__23809 = union_expr;
if(cljs.core.truth_(union_recur_QMARK_)){
return om.next.reduce_union_recursion_depth(G__23809,recurse_key);
} else {
return G__23809;
}
})();
var query_SINGLEQUOTE_ = (function (){var G__23810 = query__$1;
if(cljs.core.map_QMARK_(query__$1)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__23810,cljs.core.first(ident));
} else {
return G__23810;
}
})();
return om$next$denormalize_STAR_(query_SINGLEQUOTE_,ident_SINGLEQUOTE_,refs,map_ident,idents_seen,union_seen_SINGLEQUOTE_,null);
});})(data__$1))
;
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(step),data__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_STAR_], null),query)){
return data__$1;
} else {
var map__23811 = cljs.core.group_by(((function (data__$1){
return (function (p1__23782_SHARP_){
var or__6221__auto__ = om.util.join_QMARK_(p1__23782_SHARP_);
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return (om.util.ident_QMARK_(p1__23782_SHARP_)) || ((cljs.core.seq_QMARK_(p1__23782_SHARP_)) && (om.util.ident_QMARK_(cljs.core.first(p1__23782_SHARP_))));
}
});})(data__$1))
,query);
var map__23811__$1 = ((((!((map__23811 == null)))?((((map__23811.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23811.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__23811):map__23811);
var props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23811__$1,false);
var joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23811__$1,true);
var props__$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (map__23811,map__23811__$1,props,joins,data__$1){
return (function (p1__23783_SHARP_){
var G__23813 = p1__23783_SHARP_;
if(cljs.core.seq_QMARK_(p1__23783_SHARP_)){
return cljs.core.first(G__23813);
} else {
return G__23813;
}
});})(map__23811,map__23811__$1,props,joins,data__$1))
,props);
var joins__$1 = cljs.core.seq(joins);
var ret = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(!((joins__$1 == null))){
var join = cljs.core.first(joins__$1);
var join__$1 = (function (){var G__23817 = join;
if(cljs.core.seq_QMARK_(join)){
return cljs.core.first(G__23817);
} else {
return G__23817;
}
})();
var join__$2 = (function (){var G__23818 = join__$1;
if(om.util.ident_QMARK_(join__$1)){
return cljs.core.PersistentHashMap.fromArrays([G__23818],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_STAR_], null)]);
} else {
return G__23818;
}
})();
var vec__23814 = om.util.join_entry(join__$2);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23814,(0),null);
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23814,(1),null);
var recurse_QMARK_ = om.util.recursion_QMARK_(sel);
var recurse_key__$1 = ((recurse_QMARK_)?key:null);
var v = ((om.util.ident_QMARK_(key))?((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$_,cljs.core.second(key)))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(refs,cljs.core.first(key)):cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(refs,(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(key) : map_ident.call(null,key)))):cljs.core.get.cljs$core$IFn$_invoke$arity$2(data__$1,key));
var key__$1 = (function (){var G__23819 = key;
if(om.util.unique_ident_QMARK_(key)){
return cljs.core.first(G__23819);
} else {
return G__23819;
}
})();
var v__$1 = ((om.util.ident_QMARK_(v))?(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(v) : map_ident.call(null,v)):v);
var limit = ((typeof sel === 'number')?sel:cljs.core.cst$kw$none);
var union_entry = ((om.util.union_QMARK_(join__$2))?sel:union_expr);
var sel__$1 = ((recurse_QMARK_)?((!((union_expr == null)))?union_entry:om.next.reduce_query_depth(query,key__$1)):(((om.util.ident_QMARK_(key__$1)) && (om.util.union_QMARK_(join__$2)))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(sel,cljs.core.first(key__$1)):(((om.util.ident_QMARK_(v__$1)) && (om.util.union_QMARK_(join__$2)))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(sel,cljs.core.first(v__$1)):sel
)));
var graph_loop_QMARK_ = (recurse_QMARK_) && (cljs.core.contains_QMARK_(cljs.core.set(cljs.core.get.cljs$core$IFn$_invoke$arity$2(idents_seen,key__$1)),v__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$none,limit));
var idents_seen__$1 = (((om.util.ident_QMARK_(v__$1)) && (recurse_QMARK_))?cljs.core.assoc_in(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(idents_seen,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key__$1], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),v__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$last_DASH_ident,key__$1], null),v__$1):idents_seen);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),limit)){
var G__23855 = cljs.core.next(joins__$1);
var G__23856 = ret;
joins__$1 = G__23855;
ret = G__23856;
continue;
} else {
if(graph_loop_QMARK_){
var G__23857 = cljs.core.next(joins__$1);
var G__23858 = ret;
joins__$1 = G__23857;
ret = G__23858;
continue;
} else {
if((v__$1 == null)){
var G__23859 = cljs.core.next(joins__$1);
var G__23860 = ret;
joins__$1 = G__23859;
ret = G__23860;
continue;
} else {
var G__23861 = cljs.core.next(joins__$1);
var G__23862 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,key__$1,om$next$denormalize_STAR_(sel__$1,v__$1,refs,map_ident,idents_seen__$1,union_entry,recurse_key__$1));
joins__$1 = G__23861;
ret = G__23862;
continue;

}
}
}
} else {
var temp__4655__auto__ = cljs.core.some(((function (joins__$1,ret,map__23811,map__23811__$1,props,joins,props__$1,data__$1){
return (function (p__23820){
var vec__23821 = p__23820;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23821,(0),null);
var identset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23821,(1),null);
if(cljs.core.contains_QMARK_(identset,cljs.core.get.cljs$core$IFn$_invoke$arity$2(data__$1,k))){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(idents_seen,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$last_DASH_ident,k], null));
} else {
return null;
}
});})(joins__$1,ret,map__23811,map__23811__$1,props,joins,props__$1,data__$1))
,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(idents_seen,cljs.core.cst$kw$last_DASH_ident));
if(cljs.core.truth_(temp__4655__auto__)){
var looped_key = temp__4655__auto__;
return looped_key;
} else {
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.select_keys(data__$1,props__$1),ret], 0));
}
}
break;
}
}
}
});
/**
 * Given a query, some data in the default database format, and the entire
 * application state in the default database format, return the tree where all
 * ident links have been replaced with their original node values.
 */
om.next.db__GT_tree = (function om$next$db__GT_tree(var_args){
var args23892 = [];
var len__7296__auto___23919 = arguments.length;
var i__7297__auto___23920 = (0);
while(true){
if((i__7297__auto___23920 < len__7296__auto___23919)){
args23892.push((arguments[i__7297__auto___23920]));

var G__23928 = (i__7297__auto___23920 + (1));
i__7297__auto___23920 = G__23928;
continue;
} else {
}
break;
}

var G__23901 = args23892.length;
switch (G__23901) {
case 3:
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23892.length)].join('')));

}
});

om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$3 = (function (query,data,refs){
return om.next.denormalize_STAR_(query,data,refs,cljs.core.identity,cljs.core.PersistentArrayMap.EMPTY,null,null);
});

om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$4 = (function (query,data,refs,map_ident){
return om.next.denormalize_STAR_(query,data,refs,map_ident,cljs.core.PersistentArrayMap.EMPTY,null,null);
});

om.next.db__GT_tree.cljs$lang$maxFixedArity = 4;

om.next.rewrite = (function om$next$rewrite(rewrite_map,result){
var step = (function om$next$rewrite_$_step(res,p__23978){
var vec__23982 = p__23978;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23982,(0),null);
var orig_paths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23982,(1),null);
var to_move = cljs.core.get.cljs$core$IFn$_invoke$arity$2(result,k);
var res_SINGLEQUOTE_ = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (to_move,vec__23982,k,orig_paths){
return (function (p1__23944_SHARP_,p2__23945_SHARP_){
return cljs.core.assoc_in(p1__23944_SHARP_,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p2__23945_SHARP_,k),to_move);
});})(to_move,vec__23982,k,orig_paths))
,res,orig_paths);
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(res_SINGLEQUOTE_,k);
});
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,result,rewrite_map);
});
/**
 * When given a join `{:join selector-vector}`, roots found so far, and a `path` prefix:
 *   returns a (possibly empty) sequence of [re-rooted-join prefix] results.
 *   Does NOT support sub-roots. Each re-rooted join will share only
 *   one common parent (their common branching point).
 *   
 */
om.next.move_roots = (function om$next$move_roots(join,result_roots,path){
var query_root_QMARK_ = (function om$next$move_roots_$_query_root_QMARK_(join__$1){
return cljs.core.cst$kw$query_DASH_root.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(join__$1)) === true;
});
if(cljs.core.truth_(om.util.join_QMARK_(join))){
if(cljs.core.truth_(query_root_QMARK_(join))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result_roots,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [join,path], null));
} else {
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__23985_SHARP_){
return om$next$move_roots(p1__23985_SHARP_,result_roots,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,om.util.join_key(join)));
}),cljs.core.array_seq([om.util.join_value(join)], 0));
}
} else {
return result_roots;
}
});
/**
 * Searches a query for duplicate joins and deep-merges them into a new query.
 */
om.next.merge_joins = (function om$next$merge_joins(query){
var step = (function om$next$merge_joins_$_step(res,expr){
if(cljs.core.contains_QMARK_(cljs.core.cst$kw$elements_DASH_seen.cljs$core$IFn$_invoke$arity$1(res),expr)){
return res;
} else {
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4((cljs.core.truth_((function (){var and__6209__auto__ = om.util.join_QMARK_(expr);
if(cljs.core.truth_(and__6209__auto__)){
return (!(om.util.union_QMARK_(expr))) && (!(cljs.core.list_QMARK_(expr)));
} else {
return and__6209__auto__;
}
})())?(function (){var jk = om.util.join_key(expr);
var jv = om.util.join_value(expr);
var q = (function (){var or__6221__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$query_DASH_by_DASH_join.cljs$core$IFn$_invoke$arity$1(res),jk);
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var nq = ((om.util.recursion_QMARK_(q))?q:((om.util.recursion_QMARK_(jv))?jv:om$next$merge_joins(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(q,jv)))
));
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$5(res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$query_DASH_by_DASH_join], null),cljs.core.assoc,jk,nq);
})():cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$not_DASH_mergeable], null),cljs.core.conj,expr)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$elements_DASH_seen], null),cljs.core.conj,expr);
}
});
var init = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$query_DASH_by_DASH_join,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$elements_DASH_seen,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$not_DASH_mergeable,cljs.core.PersistentVector.EMPTY], null);
var res = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,init,query);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$not_DASH_mergeable.cljs$core$IFn$_invoke$arity$1(res),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (init,res){
return (function (p__23997){
var vec__23998 = p__23997;
var jkey = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23998,(0),null);
var jsel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23998,(1),null);
return cljs.core.PersistentArrayMap.fromArray([jkey,jsel], true, false);
});})(init,res))
,cljs.core.cst$kw$query_DASH_by_DASH_join.cljs$core$IFn$_invoke$arity$1(res))));
});
om.next.process_roots = (function om$next$process_roots(query){

var retain = (function om$next$process_roots_$_retain(expr){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [expr,cljs.core.PersistentVector.EMPTY], null)], null);
});
var reroot = (function om$next$process_roots_$_reroot(expr){
var roots = om.next.move_roots(expr,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY);
if(cljs.core.empty_QMARK_(roots)){
return retain(expr);
} else {
return roots;
}
});
var rewrite_map_step = (function om$next$process_roots_$_rewrite_map_step(rewrites,p__24022){
var vec__24026 = p__24022;
var expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24026,(0),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24026,(1),null);
if(cljs.core.empty_QMARK_(path)){
return rewrites;
} else {
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(rewrites,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [om.util.join_key(expr)], null),cljs.core.conj,path);
}
});
var reroots = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(reroot,cljs.core.array_seq([query], 0));
var query__$1 = om.next.merge_joins(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.first,reroots));
var rewrite_map = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(rewrite_map_step,cljs.core.PersistentArrayMap.EMPTY,reroots);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,query__$1,cljs.core.cst$kw$rewrite,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(om.next.rewrite,rewrite_map)], null);
});
om.next.merge_idents = (function om$next$merge_idents(tree,config,refs,query){
var map__24046 = config;
var map__24046__$1 = ((((!((map__24046 == null)))?((((map__24046.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24046.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__24046):map__24046);
var merge_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24046__$1,cljs.core.cst$kw$merge_DASH_ident);
var indexer = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24046__$1,cljs.core.cst$kw$indexer);
var ident_joins = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__24046,map__24046__$1,merge_ident,indexer){
return (function (p1__24029_SHARP_){
var and__6209__auto__ = om.util.join_QMARK_(p1__24029_SHARP_);
if(cljs.core.truth_(and__6209__auto__)){
return om.util.ident_QMARK_(om.util.join_key(p1__24029_SHARP_));
} else {
return and__6209__auto__;
}
});})(map__24046,map__24046__$1,merge_ident,indexer))
,query));
var step = ((function (map__24046,map__24046__$1,merge_ident,indexer,ident_joins){
return (function om$next$merge_idents_$_step(tree_SINGLEQUOTE_,p__24055){
var vec__24059 = p__24055;
var ident = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24059,(0),null);
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24059,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$normalize.cljs$core$IFn$_invoke$arity$1(config))){
var c_or_q = (function (){var or__6221__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ident_joins,ident);
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return om.next.ref__GT_any(indexer,ident);
}
})();
var props_SINGLEQUOTE_ = om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2(c_or_q,props);
var refs__$1 = cljs.core.meta(props_SINGLEQUOTE_);
return cljs.core.cst$kw$merge_DASH_tree.cljs$core$IFn$_invoke$arity$1(config).call(null,(merge_ident.cljs$core$IFn$_invoke$arity$4 ? merge_ident.cljs$core$IFn$_invoke$arity$4(config,tree_SINGLEQUOTE_,ident,props_SINGLEQUOTE_) : merge_ident.call(null,config,tree_SINGLEQUOTE_,ident,props_SINGLEQUOTE_)),refs__$1);
} else {
return (merge_ident.cljs$core$IFn$_invoke$arity$4 ? merge_ident.cljs$core$IFn$_invoke$arity$4(config,tree_SINGLEQUOTE_,ident,props) : merge_ident.call(null,config,tree_SINGLEQUOTE_,ident,props));
}
});})(map__24046,map__24046__$1,merge_ident,indexer,ident_joins))
;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,tree,refs);
});
om.next.merge_novelty_BANG_ = (function om$next$merge_novelty_BANG_(reconciler,state,res,query){
var config = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler);
var vec__24072 = om.next.sift_idents(res);
var idts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24072,(0),null);
var res_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24072,(1),null);
var res_SINGLEQUOTE___$1 = (cljs.core.truth_(cljs.core.cst$kw$normalize.cljs$core$IFn$_invoke$arity$1(config))?om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3((function (){var or__6221__auto__ = query;
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return cljs.core.cst$kw$root.cljs$core$IFn$_invoke$arity$1((function (){var G__24075 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__24075) : cljs.core.deref.call(null,G__24075));
})());
}
})(),res_SINGLEQUOTE_,true):res_SINGLEQUOTE_);
return cljs.core.cst$kw$merge_DASH_tree.cljs$core$IFn$_invoke$arity$1(config).call(null,om.next.merge_idents(state,config,idts,query),res_SINGLEQUOTE___$1);
});
om.next.default_merge = (function om$next$default_merge(reconciler,state,res,query){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$keys,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol_QMARK_),cljs.core.keys(res)),cljs.core.cst$kw$next,om.next.merge_novelty_BANG_(reconciler,state,res,query),cljs.core.cst$kw$tempids,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.merge,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tempids,cljs.core.second),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol_QMARK_,cljs.core.first),res)))], null);
});
/**
 * Merge a state delta into the application state. Affected components managed
 * by the reconciler will re-render.
 */
om.next.merge_BANG_ = (function om$next$merge_BANG_(var_args){
var args24078 = [];
var len__7296__auto___24103 = arguments.length;
var i__7297__auto___24104 = (0);
while(true){
if((i__7297__auto___24104 < len__7296__auto___24103)){
args24078.push((arguments[i__7297__auto___24104]));

var G__24105 = (i__7297__auto___24104 + (1));
i__7297__auto___24104 = G__24105;
continue;
} else {
}
break;
}

var G__24082 = args24078.length;
switch (G__24082) {
case 2:
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24078.length)].join('')));

}
});

om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (reconciler,delta){
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3(reconciler,delta,null);
});

om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (reconciler,delta,query){
var config = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler);
var state = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(config);
var merge_STAR_ = cljs.core.cst$kw$merge.cljs$core$IFn$_invoke$arity$1(config);
var map__24083 = (function (){var G__24084 = reconciler;
var G__24085 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.deref.call(null,state));
var G__24086 = delta;
var G__24087 = query;
return (merge_STAR_.cljs$core$IFn$_invoke$arity$4 ? merge_STAR_.cljs$core$IFn$_invoke$arity$4(G__24084,G__24085,G__24086,G__24087) : merge_STAR_.call(null,G__24084,G__24085,G__24086,G__24087));
})();
var map__24083__$1 = ((((!((map__24083 == null)))?((((map__24083.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24083.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__24083):map__24083);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24083__$1,cljs.core.cst$kw$keys);
var next = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24083__$1,cljs.core.cst$kw$next);
var tempids = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24083__$1,cljs.core.cst$kw$tempids);
om.next.protocols.queue_BANG_(reconciler,keys);

var G__24095 = state;
var G__24096 = (function (){var temp__4655__auto__ = cljs.core.cst$kw$migrate.cljs$core$IFn$_invoke$arity$1(config);
if(cljs.core.truth_(temp__4655__auto__)){
var migrate = temp__4655__auto__;
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.select_keys(next,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_queries], null)),(function (){var G__24098 = next;
var G__24099 = (function (){var or__6221__auto__ = query;
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return om.next.get_query(cljs.core.cst$kw$root.cljs$core$IFn$_invoke$arity$1((function (){var G__24102 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__24102) : cljs.core.deref.call(null,G__24102));
})()));
}
})();
var G__24100 = tempids;
var G__24101 = cljs.core.cst$kw$id_DASH_key.cljs$core$IFn$_invoke$arity$1(config);
return (migrate.cljs$core$IFn$_invoke$arity$4 ? migrate.cljs$core$IFn$_invoke$arity$4(G__24098,G__24099,G__24100,G__24101) : migrate.call(null,G__24098,G__24099,G__24100,G__24101));
})()], 0));
} else {
return next;
}
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__24095,G__24096) : cljs.core.reset_BANG_.call(null,G__24095,G__24096));
});

om.next.merge_BANG_.cljs$lang$maxFixedArity = 3;


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {om.next.protocols.IReconciler}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
om.next.Reconciler = (function (config,state,__meta,__extmap,__hash){
this.config = config;
this.state = state;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229700362;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
om.next.Reconciler.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__6843__auto__,k__6844__auto__){
var self__ = this;
var this__6843__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__6843__auto____$1,k__6844__auto__,null);
});

om.next.Reconciler.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__6845__auto__,k24168,else__6846__auto__){
var self__ = this;
var this__6845__auto____$1 = this;
var G__24175 = (((k24168 instanceof cljs.core.Keyword))?k24168.fqn:null);
switch (G__24175) {
case "config":
return self__.config;

break;
case "state":
return self__.state;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k24168,else__6846__auto__);

}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$ = true;

om.next.Reconciler.prototype.om$next$protocols$IReconciler$queue_BANG_$arity$2 = (function (_,ks){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queue], null),cljs.core.into,cljs.core.array_seq([ks], 0));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$queue_sends_BANG_$arity$2 = (function (_,sends){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queued_DASH_sends], null),cljs.core.cst$kw$merge_DASH_sends.cljs$core$IFn$_invoke$arity$1(self__.config),cljs.core.array_seq([sends], 0));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$send_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var sends = cljs.core.cst$kw$queued_DASH_sends.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)));
if(cljs.core.empty_QMARK_(sends)){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.state,((function (sends,this$__$1){
return (function (state__$1){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(state__$1,cljs.core.cst$kw$queued_DASH_sends,cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$sends_DASH_queued,false);
});})(sends,this$__$1))
);

return cljs.core.cst$kw$send.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,sends,((function (sends,this$__$1){
return (function (res,query){
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$1,res,query);
});})(sends,this$__$1))
);
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$reconcile_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var st = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state));
var q = cljs.core.cst$kw$queue.cljs$core$IFn$_invoke$arity$1(st);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queued], null),cljs.core.not);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,cljs.core.cst$kw$queue,cljs.core.PersistentVector.EMPTY);

if(cljs.core.empty_QMARK_(q)){
return cljs.core.cst$kw$render.cljs$core$IFn$_invoke$arity$1(st).call(null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_skip], null),q)){
return null;
} else {
var cs = cljs.core.transduce.cljs$core$IFn$_invoke$arity$4(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (st,q,___$1){
return (function (p1__24164_SHARP_){
return om.next.protocols.key__GT_components(cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(self__.config),p1__24164_SHARP_);
});})(st,q,___$1))
),((function (st,q,___$1){
return (function (p1__24165_SHARP_,p2__24166_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(p1__24165_SHARP_,p2__24166_SHARP_);
});})(st,q,___$1))
,cljs.core.PersistentHashSet.EMPTY,q);
var map__24181 = self__.config;
var map__24181__$1 = ((((!((map__24181 == null)))?((((map__24181.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24181.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__24181):map__24181);
var ui__GT_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24181__$1,cljs.core.cst$kw$ui_DASH__GT_props);
var env = om.next.to_env(self__.config);
var seq__24185 = cljs.core.seq(cljs.core.cst$kw$optimize.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,cs));
var chunk__24186 = null;
var count__24187 = (0);
var i__24188 = (0);
while(true){
if((i__24188 < count__24187)){
var c = chunk__24186.cljs$core$IIndexed$_nth$arity$2(null,i__24188);
if(om.next.mounted_QMARK_(c)){
var computed_24278 = om.next.get_computed.cljs$core$IFn$_invoke$arity$1(om.next.props(c));
var next_props_24279 = om.next.computed((ui__GT_props.cljs$core$IFn$_invoke$arity$2 ? ui__GT_props.cljs$core$IFn$_invoke$arity$2(env,c) : ui__GT_props.call(null,env,c)),computed_24278);
if(cljs.core.truth_(om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3(c,next_props_24279,om.next.get_state.cljs$core$IFn$_invoke$arity$1(c)))){
if(!((next_props_24279 == null))){
om.next.update_component_BANG_(c,next_props_24279);
} else {
c.forceUpdate();
}
} else {
}
} else {
}

var G__24280 = seq__24185;
var G__24281 = chunk__24186;
var G__24282 = count__24187;
var G__24283 = (i__24188 + (1));
seq__24185 = G__24280;
chunk__24186 = G__24281;
count__24187 = G__24282;
i__24188 = G__24283;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__24185);
if(temp__4657__auto__){
var seq__24185__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__24185__$1)){
var c__7032__auto__ = cljs.core.chunk_first(seq__24185__$1);
var G__24284 = cljs.core.chunk_rest(seq__24185__$1);
var G__24285 = c__7032__auto__;
var G__24286 = cljs.core.count(c__7032__auto__);
var G__24287 = (0);
seq__24185 = G__24284;
chunk__24186 = G__24285;
count__24187 = G__24286;
i__24188 = G__24287;
continue;
} else {
var c = cljs.core.first(seq__24185__$1);
if(om.next.mounted_QMARK_(c)){
var computed_24300 = om.next.get_computed.cljs$core$IFn$_invoke$arity$1(om.next.props(c));
var next_props_24301 = om.next.computed((ui__GT_props.cljs$core$IFn$_invoke$arity$2 ? ui__GT_props.cljs$core$IFn$_invoke$arity$2(env,c) : ui__GT_props.call(null,env,c)),computed_24300);
if(cljs.core.truth_(om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3(c,next_props_24301,om.next.get_state.cljs$core$IFn$_invoke$arity$1(c)))){
if(!((next_props_24301 == null))){
om.next.update_component_BANG_(c,next_props_24301);
} else {
c.forceUpdate();
}
} else {
}
} else {
}

var G__24303 = cljs.core.next(seq__24185__$1);
var G__24304 = null;
var G__24305 = (0);
var G__24306 = (0);
seq__24185 = G__24303;
chunk__24186 = G__24304;
count__24187 = G__24305;
i__24188 = G__24306;
continue;
}
} else {
return null;
}
}
break;
}

}
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$schedule_render_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.not(cljs.core.cst$kw$queued.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state))))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queued], null),cljs.core.not);
} else {
return false;
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$schedule_sends_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.not(cljs.core.cst$kw$sends_DASH_queued.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state))))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,cljs.core.cst$kw$sends_DASH_queued,true);

return true;
} else {
return false;
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$basis_t$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$t.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$add_root_BANG_$arity$4 = (function (this$,root_class,target,options){
var self__ = this;
var this$__$1 = this;
var ret = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var rctor = om.next.factory.cljs$core$IFn$_invoke$arity$1(root_class);
var guid = cljs.core.random_uuid();
if(om.next.iquery_QMARK_(root_class)){
om.next.protocols.index_root(cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(self__.config),root_class);
} else {
}

if(cljs.core.truth_((function (){var and__6209__auto__ = cljs.core.cst$kw$normalize.cljs$core$IFn$_invoke$arity$1(self__.config);
if(cljs.core.truth_(and__6209__auto__)){
return cljs.core.not(cljs.core.cst$kw$normalized.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state))));
} else {
return and__6209__auto__;
}
})())){
var new_state_24311 = om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2(root_class,(function (){var G__24203 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__24203) : cljs.core.deref.call(null,G__24203));
})());
var refs_24312 = cljs.core.meta(new_state_24311);
var G__24205_24313 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
var G__24206_24314 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new_state_24311,refs_24312], 0));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__24205_24313,G__24206_24314) : cljs.core.reset_BANG_.call(null,G__24205_24313,G__24206_24314));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,cljs.core.cst$kw$normalized,true);
} else {
}

var renderf = ((function (ret,rctor,guid,this$__$1){
return (function (data){
var _STAR_reconciler_STAR_24207 = om.next._STAR_reconciler_STAR_;
var _STAR_shared_STAR_24208 = om.next._STAR_shared_STAR_;
var _STAR_instrument_STAR_24209 = om.next._STAR_instrument_STAR_;
om.next._STAR_reconciler_STAR_ = this$__$1;

om.next._STAR_shared_STAR_ = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$shared.cljs$core$IFn$_invoke$arity$1(self__.config),(cljs.core.truth_(cljs.core.cst$kw$shared_DASH_fn.cljs$core$IFn$_invoke$arity$1(self__.config))?cljs.core.cst$kw$shared_DASH_fn.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,data):null)], 0));

om.next._STAR_instrument_STAR_ = cljs.core.cst$kw$instrument.cljs$core$IFn$_invoke$arity$1(self__.config);

try{var c = ((!((target == null)))?cljs.core.cst$kw$root_DASH_render.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,(rctor.cljs$core$IFn$_invoke$arity$1 ? rctor.cljs$core$IFn$_invoke$arity$1(data) : rctor.call(null,data)),target):((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret)) == null))?(rctor.cljs$core$IFn$_invoke$arity$1 ? rctor.cljs$core$IFn$_invoke$arity$1(data) : rctor.call(null,data)):(function (){var temp__4657__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
if(cljs.core.truth_(temp__4657__auto__)){
var c_SINGLEQUOTE_ = temp__4657__auto__;
if(om.next.mounted_QMARK_(c_SINGLEQUOTE_)){
return c_SINGLEQUOTE_.forceUpdate(data);
} else {
return null;
}
} else {
return null;
}
})()
));
if((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret)) == null)) && (!((c == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,cljs.core.cst$kw$root,c);

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(ret,c) : cljs.core.reset_BANG_.call(null,ret,c));
} else {
return null;
}
}finally {om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_24209;

om.next._STAR_shared_STAR_ = _STAR_shared_STAR_24208;

om.next._STAR_reconciler_STAR_ = _STAR_reconciler_STAR_24207;
}});})(ret,rctor,guid,this$__$1))
;
var parsef = ((function (renderf,ret,rctor,guid,this$__$1){
return (function (){
var sel = om.next.get_query((function (){var or__6221__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return root_class;
}
})());
if(((sel == null)) || (cljs.core.vector_QMARK_(sel))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Application root query must be a vector"),cljs.core.str("\n"),cljs.core.str("(or (nil? sel) (vector? sel))")].join('')));
}

if(!((sel == null))){
var env = om.next.to_env(self__.config);
var v = cljs.core.cst$kw$parser.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,env,sel);
if(cljs.core.empty_QMARK_(v)){
return null;
} else {
return renderf(v);
}
} else {
return renderf((function (){var G__24215 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__24215) : cljs.core.deref.call(null,G__24215));
})());
}
});})(renderf,ret,rctor,guid,this$__$1))
;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.state,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$target,target,cljs.core.cst$kw$render,parsef,cljs.core.cst$kw$root,root_class,cljs.core.cst$kw$remove,((function (renderf,parsef,ret,rctor,guid,this$__$1){
return (function (){
cljs.core.remove_watch(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config),(function (){var or__6221__auto__ = target;
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return guid;
}
})());

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.state,((function (renderf,parsef,ret,rctor,guid,this$__$1){
return (function (p1__24162_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__24162_SHARP_,cljs.core.cst$kw$target),cljs.core.cst$kw$render),cljs.core.cst$kw$root),cljs.core.cst$kw$remove);
});})(renderf,parsef,ret,rctor,guid,this$__$1))
);

if((target == null)){
return null;
} else {
return cljs.core.cst$kw$root_DASH_unmount.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,target);
}
});})(renderf,parsef,ret,rctor,guid,this$__$1))
], null));

cljs.core.add_watch(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config),(function (){var or__6221__auto__ = target;
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return guid;
}
})(),((function (renderf,parsef,ret,rctor,guid,this$__$1){
return (function (_,___$1,___$2,___$3){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$t], null),cljs.core.inc);

return om.next.schedule_render_BANG_(this$__$1);
});})(renderf,parsef,ret,rctor,guid,this$__$1))
);

parsef();

var temp__4657__auto___24374 = om.next.get_query((function (){var or__6221__auto__ = (function (){var and__6209__auto__ = target;
if(cljs.core.truth_(and__6209__auto__)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return and__6209__auto__;
}
})();
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return root_class;
}
})());
if(cljs.core.truth_(temp__4657__auto___24374)){
var sel_24398 = temp__4657__auto___24374;
var env_24399 = om.next.to_env(self__.config);
var snds_24400 = om.next.gather_sends(env_24399,sel_24398,cljs.core.cst$kw$remotes.cljs$core$IFn$_invoke$arity$1(self__.config));
if(cljs.core.empty_QMARK_(snds_24400)){
} else {
var temp__4657__auto___24408__$1 = cljs.core.cst$kw$send.cljs$core$IFn$_invoke$arity$1(self__.config);
if(cljs.core.truth_(temp__4657__auto___24408__$1)){
var send_24413 = temp__4657__auto___24408__$1;
var G__24226_24414 = snds_24400;
var G__24227_24415 = ((function (G__24226_24414,send_24413,temp__4657__auto___24408__$1,env_24399,snds_24400,sel_24398,temp__4657__auto___24374,renderf,parsef,ret,rctor,guid,this$__$1){
return (function (res,query){
om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$1,res,query);

return renderf(cljs.core.cst$kw$parser.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,env_24399,sel_24398));
});})(G__24226_24414,send_24413,temp__4657__auto___24408__$1,env_24399,snds_24400,sel_24398,temp__4657__auto___24374,renderf,parsef,ret,rctor,guid,this$__$1))
;
(send_24413.cljs$core$IFn$_invoke$arity$2 ? send_24413.cljs$core$IFn$_invoke$arity$2(G__24226_24414,G__24227_24415) : send_24413.call(null,G__24226_24414,G__24227_24415));
} else {
}
}
} else {
}

return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$reindex_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var root = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)),cljs.core.cst$kw$root);
if(om.next.iquery_QMARK_(root)){
var indexer = cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(self__.config);
var c = cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(indexer) : cljs.core.deref.call(null,indexer)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,root], null)));
return om.next.protocols.index_root(indexer,(function (){var or__6221__auto__ = c;
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return root;
}
})());
} else {
return null;
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$remove_root_BANG_$arity$2 = (function (_,target){
var self__ = this;
var ___$1 = this;
var temp__4657__auto__ = cljs.core.cst$kw$remove.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)));
if(cljs.core.truth_(temp__4657__auto__)){
var remove = temp__4657__auto__;
return (remove.cljs$core$IFn$_invoke$arity$0 ? remove.cljs$core$IFn$_invoke$arity$0() : remove.call(null));
} else {
return null;
}
});

om.next.Reconciler.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__6857__auto__,writer__6858__auto__,opts__6859__auto__){
var self__ = this;
var this__6857__auto____$1 = this;
var pr_pair__6860__auto__ = ((function (this__6857__auto____$1){
return (function (keyval__6861__auto__){
return cljs.core.pr_sequential_writer(writer__6858__auto__,cljs.core.pr_writer,""," ","",opts__6859__auto__,keyval__6861__auto__);
});})(this__6857__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__6858__auto__,pr_pair__6860__auto__,"#om.next.Reconciler{",", ","}",opts__6859__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$config,self__.config],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$state,self__.state],null))], null),self__.__extmap));
});

om.next.Reconciler.prototype.cljs$core$IIterable$ = true;

om.next.Reconciler.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__24167){
var self__ = this;
var G__24167__$1 = this;
return (new cljs.core.RecordIter((0),G__24167__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$config,cljs.core.cst$kw$state], null),cljs.core._iterator(self__.__extmap)));
});

om.next.Reconciler.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__6841__auto__){
var self__ = this;
var this__6841__auto____$1 = this;
return self__.__meta;
});

om.next.Reconciler.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__6837__auto__){
var self__ = this;
var this__6837__auto____$1 = this;
return (new om.next.Reconciler(self__.config,self__.state,self__.__meta,self__.__extmap,self__.__hash));
});

om.next.Reconciler.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__6847__auto__){
var self__ = this;
var this__6847__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

om.next.Reconciler.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__6838__auto__){
var self__ = this;
var this__6838__auto____$1 = this;
var h__6656__auto__ = self__.__hash;
if(!((h__6656__auto__ == null))){
return h__6656__auto__;
} else {
var h__6656__auto____$1 = cljs.core.hash_imap(this__6838__auto____$1);
self__.__hash = h__6656__auto____$1;

return h__6656__auto____$1;
}
});

om.next.Reconciler.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__6839__auto__,other__6840__auto__){
var self__ = this;
var this__6839__auto____$1 = this;
if(cljs.core.truth_((function (){var and__6209__auto__ = other__6840__auto__;
if(cljs.core.truth_(and__6209__auto__)){
var and__6209__auto____$1 = (this__6839__auto____$1.constructor === other__6840__auto__.constructor);
if(and__6209__auto____$1){
return cljs.core.equiv_map(this__6839__auto____$1,other__6840__auto__);
} else {
return and__6209__auto____$1;
}
} else {
return and__6209__auto__;
}
})())){
return true;
} else {
return false;
}
});

om.next.Reconciler.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__6852__auto__,k__6853__auto__){
var self__ = this;
var this__6852__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$config,null,cljs.core.cst$kw$state,null], null), null),k__6853__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__6852__auto____$1),self__.__meta),k__6853__auto__);
} else {
return (new om.next.Reconciler(self__.config,self__.state,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__6853__auto__)),null));
}
});

om.next.Reconciler.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__6850__auto__,k__6851__auto__,G__24167){
var self__ = this;
var this__6850__auto____$1 = this;
var pred__24236 = cljs.core.keyword_identical_QMARK_;
var expr__24237 = k__6851__auto__;
if(cljs.core.truth_((pred__24236.cljs$core$IFn$_invoke$arity$2 ? pred__24236.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$config,expr__24237) : pred__24236.call(null,cljs.core.cst$kw$config,expr__24237)))){
return (new om.next.Reconciler(G__24167,self__.state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__24236.cljs$core$IFn$_invoke$arity$2 ? pred__24236.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$state,expr__24237) : pred__24236.call(null,cljs.core.cst$kw$state,expr__24237)))){
return (new om.next.Reconciler(self__.config,G__24167,self__.__meta,self__.__extmap,null));
} else {
return (new om.next.Reconciler(self__.config,self__.state,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__6851__auto__,G__24167),null));
}
}
});

om.next.Reconciler.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__6855__auto__){
var self__ = this;
var this__6855__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$config,self__.config],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$state,self__.state],null))], null),self__.__extmap));
});

om.next.Reconciler.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__6842__auto__,G__24167){
var self__ = this;
var this__6842__auto____$1 = this;
return (new om.next.Reconciler(self__.config,self__.state,G__24167,self__.__extmap,self__.__hash));
});

om.next.Reconciler.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__6848__auto__,entry__6849__auto__){
var self__ = this;
var this__6848__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__6849__auto__)){
return cljs.core._assoc(this__6848__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__6849__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__6849__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__6848__auto____$1,entry__6849__auto__);
}
});

om.next.Reconciler.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var G__24241 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__24241) : cljs.core.deref.call(null,G__24241));
});

om.next.Reconciler.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$config,cljs.core.cst$sym$state], null);
});

om.next.Reconciler.cljs$lang$type = true;

om.next.Reconciler.cljs$lang$ctorPrSeq = (function (this__6877__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"om.next/Reconciler");
});

om.next.Reconciler.cljs$lang$ctorPrWriter = (function (this__6877__auto__,writer__6878__auto__){
return cljs.core._write(writer__6878__auto__,"om.next/Reconciler");
});

om.next.__GT_Reconciler = (function om$next$__GT_Reconciler(config,state){
return (new om.next.Reconciler(config,state,null,null,null));
});

om.next.map__GT_Reconciler = (function om$next$map__GT_Reconciler(G__24169){
return (new om.next.Reconciler(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(G__24169),cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(G__24169),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__24169,cljs.core.cst$kw$config,cljs.core.array_seq([cljs.core.cst$kw$state], 0)),null));
});

om.next.default_ui__GT_props = (function om$next$default_ui__GT_props(p__24529,c){
var map__24539 = p__24529;
var map__24539__$1 = ((((!((map__24539 == null)))?((((map__24539.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24539.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__24539):map__24539);
var env = map__24539__$1;
var parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24539__$1,cljs.core.cst$kw$parser);
var pathopt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24539__$1,cljs.core.cst$kw$pathopt);
var ui = (((function (){var and__6209__auto__ = pathopt;
if(and__6209__auto__){
var and__6209__auto____$1 = ((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false);
if(and__6209__auto____$1){
return om.next.iquery_QMARK_(c);
} else {
return and__6209__auto____$1;
}
} else {
return and__6209__auto__;
}
})())?(function (){var id = om.next.ident(c,om.next.props(c));
return cljs.core.get.cljs$core$IFn$_invoke$arity$2((function (){var G__24544 = env;
var G__24545 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.fromArray([id,om.next.get_query(c)], true, false)], null);
return (parser.cljs$core$IFn$_invoke$arity$2 ? parser.cljs$core$IFn$_invoke$arity$2(G__24544,G__24545) : parser.call(null,G__24544,G__24545));
})(),id);
})():null);
if(!((ui == null))){
return ui;
} else {
var fq = om.next.full_query.cljs$core$IFn$_invoke$arity$1(c);
if((fq == null)){
return null;
} else {
var s = cljs.core.system_time();
var ui__$1 = (parser.cljs$core$IFn$_invoke$arity$2 ? parser.cljs$core$IFn$_invoke$arity$2(env,fq) : parser.call(null,env,fq));
var e = cljs.core.system_time();
var temp__4657__auto___24548 = cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_(temp__4657__auto___24548)){
var l_24555 = temp__4657__auto___24548;
var dt_24560 = (e - s);
if(((16) < dt_24560)){
var G__24546_24561 = l_24555;
var G__24547_24562 = [cljs.core.str(c),cljs.core.str(" query took "),cljs.core.str(dt_24560),cljs.core.str(" msecs")].join('');
goog.log.warning(G__24546_24561,G__24547_24562);
} else {
}
} else {
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(ui__$1,om.next.path(c));
}
}
});
om.next.default_merge_ident = (function om$next$default_merge_ident(_,tree,ref,props){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(tree,ref,cljs.core.merge,props);
});
om.next.default_merge_tree = (function om$next$default_merge_tree(a,b){
if(cljs.core.map_QMARK_(a)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a,b], 0));
} else {
return b;
}
});
/**
 * Given app-state-pure (the application state as an immutable value), a query,
 * tempids (a hash map from tempid to stable id), and an optional id-key
 * keyword, return a new application state value with the tempids replaced by
 * the stable ids.
 */
om.next.default_migrate = (function om$next$default_migrate(var_args){
var args24640 = [];
var len__7296__auto___24691 = arguments.length;
var i__7297__auto___24692 = (0);
while(true){
if((i__7297__auto___24692 < len__7296__auto___24691)){
args24640.push((arguments[i__7297__auto___24692]));

var G__24693 = (i__7297__auto___24692 + (1));
i__7297__auto___24692 = G__24693;
continue;
} else {
}
break;
}

var G__24642 = args24640.length;
switch (G__24642) {
case 3:
return om.next.default_migrate.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.default_migrate.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24640.length)].join('')));

}
});

om.next.default_migrate.cljs$core$IFn$_invoke$arity$3 = (function (app_state_pure,query,tempids){
return om.next.default_migrate.cljs$core$IFn$_invoke$arity$4(app_state_pure,query,tempids,null);
});

om.next.default_migrate.cljs$core$IFn$_invoke$arity$4 = (function (app_state_pure,query,tempids,id_key){
var dissoc_in = (function om$next$dissoc_in(pure,p__24665){
var vec__24669 = p__24665;
var table = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24669,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24669,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(pure,table,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pure,table),id));
});
var step = (function om$next$step(pure,p__24672){
var vec__24684 = p__24672;
var old = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24684,(0),null);
var vec__24687 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24684,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24687,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24687,(1),null);
var new$ = vec__24687;
return cljs.core.assoc_in(dissoc_in(pure,old),new$,(function (){var G__24690 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(pure,old),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(pure,new$)], 0));
if(!((id_key == null))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24690,id_key,id);
} else {
return G__24690;
}
})());
});
if(!(cljs.core.empty_QMARK_(tempids))){
var pure_SINGLEQUOTE_ = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,app_state_pure,tempids);
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3(query,om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$4(query,pure_SINGLEQUOTE_,pure_SINGLEQUOTE_,((function (pure_SINGLEQUOTE_){
return (function (ident){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(tempids,ident,ident);
});})(pure_SINGLEQUOTE_))
),true);
} else {
return app_state_pure;
}
});

om.next.default_migrate.cljs$lang$maxFixedArity = 4;

om.next.has_error_QMARK_ = (function om$next$has_error_QMARK_(x){
return (cljs.core.map_QMARK_(x)) && (cljs.core.contains_QMARK_(x,cljs.core.cst$kw$om$next_SLASH_error));
});
om.next.default_extract_errors = (function om$next$default_extract_errors(reconciler,res,query){
var extract_STAR_ = (function om$next$default_extract_errors_$_extract_STAR_(query__$1,res__$1,errs){
var class$ = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query__$1));
var top_error_QMARK_ = (((!((class$ == null))) && (om.next.has_error_QMARK_(res__$1)))?cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(errs,((function (class$){
return (function (p1__24708_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(p1__24708_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [om.next.ident(class$,res__$1)], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.cst$kw$om$next_SLASH_error.cljs$core$IFn$_invoke$arity$1(res__$1));
});})(class$))
):null);
var ret = (((top_error_QMARK_ == null))?cljs.core.PersistentArrayMap.EMPTY:null);
if(cljs.core.vector_QMARK_(query__$1)){
if(cljs.core.vector_QMARK_(res__$1)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (class$,top_error_QMARK_,ret){
return (function (p1__24709_SHARP_){
return om$next$default_extract_errors_$_extract_STAR_(query__$1,p1__24709_SHARP_,errs);
});})(class$,top_error_QMARK_,ret))
),res__$1);
} else {
var exprs = cljs.core.seq(query__$1);
var ret__$1 = ret;
while(true){
if(!((exprs == null))){
var expr = cljs.core.first(exprs);
var k = (function (){var k = om.next.expr__GT_key(expr);
var G__24908 = k;
if(om.util.unique_ident_QMARK_(k)){
return cljs.core.first(G__24908);
} else {
return G__24908;
}
})();
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(res__$1,k);
if(om.util.mutation_QMARK_(expr)){
var mk = om.util.mutation_key(expr);
var ret_SINGLEQUOTE_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(res__$1,mk);
if(om.next.has_error_QMARK_(ret_SINGLEQUOTE_)){
var x = cljs.core.cst$kw$mutator.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(expr));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(errs,((function (exprs,ret__$1,x,mk,ret_SINGLEQUOTE_,expr,k,data,class$,top_error_QMARK_,ret){
return (function (p1__24710_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(p1__24710_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.cst$kw$om$next_SLASH_error.cljs$core$IFn$_invoke$arity$1(ret_SINGLEQUOTE_));
});})(exprs,ret__$1,x,mk,ret_SINGLEQUOTE_,expr,k,data,class$,top_error_QMARK_,ret))
);

var G__24953 = cljs.core.next(exprs);
var G__24954 = ret__$1;
exprs = G__24953;
ret__$1 = G__24954;
continue;
} else {
var G__24955 = cljs.core.next(exprs);
var G__24956 = (((ret__$1 == null))?null:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret__$1,mk,ret_SINGLEQUOTE_));
exprs = G__24955;
ret__$1 = G__24956;
continue;
}
} else {
if(om.util.union_QMARK_(expr)){
var jk = om.util.join_key(expr);
var jv = om.util.join_value(expr);
var class_SINGLEQUOTE_ = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(jv));
if(!(cljs.core.vector_QMARK_(data))){
var ret_SINGLEQUOTE_ = om$next$default_extract_errors_$_extract_STAR_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(jv,cljs.core.first(om.next.ident(class_SINGLEQUOTE_,data))),data,errs);
var G__24960 = cljs.core.next(exprs);
var G__24961 = (((ret__$1 == null))?null:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret__$1,jk,ret_SINGLEQUOTE_));
exprs = G__24960;
ret__$1 = G__24961;
continue;
} else {
var ret_SINGLEQUOTE_ = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (exprs,ret__$1,jk,jv,class_SINGLEQUOTE_,expr,k,data,class$,top_error_QMARK_,ret){
return (function (p1__24711_SHARP_){
return om$next$default_extract_errors_$_extract_STAR_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(jv,cljs.core.first(om.next.ident(class_SINGLEQUOTE_,p1__24711_SHARP_))),p1__24711_SHARP_,errs);
});})(exprs,ret__$1,jk,jv,class_SINGLEQUOTE_,expr,k,data,class$,top_error_QMARK_,ret))
),data);
var G__24980 = cljs.core.next(exprs);
var G__24981 = (((ret__$1 == null))?null:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret__$1,jk,ret_SINGLEQUOTE_));
exprs = G__24980;
ret__$1 = G__24981;
continue;
}
} else {
if(cljs.core.truth_(om.util.join_QMARK_(expr))){
var jk = om.util.join_key(expr);
var jv = om.util.join_value(expr);
var ret_SINGLEQUOTE_ = om$next$default_extract_errors_$_extract_STAR_(jv,data,errs);
var G__24986 = cljs.core.next(exprs);
var G__24987 = (((ret__$1 == null))?null:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret__$1,jk,ret_SINGLEQUOTE_));
exprs = G__24986;
ret__$1 = G__24987;
continue;
} else {
if((cljs.core.map_QMARK_(data)) && (om.next.has_error_QMARK_(data))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(errs,((function (exprs,ret__$1,expr,k,data,class$,top_error_QMARK_,ret){
return (function (p1__24712_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(p1__24712_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__6221__auto__ = (((class$ == null))?null:om.next.ident(class$,res__$1));
if(cljs.core.truth_(or__6221__auto__)){
return or__6221__auto__;
} else {
return k;
}
})()], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.cst$kw$om$next_SLASH_error.cljs$core$IFn$_invoke$arity$1(data));
});})(exprs,ret__$1,expr,k,data,class$,top_error_QMARK_,ret))
);

var G__24995 = cljs.core.next(exprs);
var G__24996 = null;
exprs = G__24995;
ret__$1 = G__24996;
continue;
} else {
var G__25001 = cljs.core.next(exprs);
var G__25002 = (((ret__$1 == null))?null:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret__$1,k,data));
exprs = G__25001;
ret__$1 = G__25002;
continue;

}
}
}
}
} else {
return ret__$1;
}
break;
}
}
} else {
return null;
}
});
var errs = (function (){var G__24923 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__24923) : cljs.core.atom.call(null,G__24923));
})();
var ret = extract_STAR_(query,res,errs);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$tree,ret,cljs.core.cst$kw$errors,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(errs) : cljs.core.deref.call(null,errs))], null);
});
/**
 * Construct a reconciler from a configuration map.
 * 
 * Required parameters:
 *   :state        - the application state. If IAtom value is not supplied the
 *                   data will be normalized into the default database format
 *                   using the root query. This can be disabled by explicitly
 *                   setting the optional :normalize parameter to false.
 *   :parser       - the parser to be used
 * 
 * Optional parameters:
 *   :shared       - a map of global shared properties for the component tree.
 *   :shared-fn    - a function to compute global shared properties from the root props.
 *                   the result is merged with :shared.
 *   :send         - required only if the parser will return a non-empty value when
 *                   run against the supplied :remotes. send is a function of two
 *                   arguments, the map of remote expressions keyed by remote target
 *                   and a callback which should be invoked with the result from each
 *                   remote target. Note this means the callback can be invoked
 *                   multiple times to support parallel fetching and incremental
 *                   loading if desired. The callback should take the response as the
 *                   first argument and the the query that was sent as the second
 *                   argument.
 *   :normalize    - whether the state should be normalized. If true it is assumed
 *                   all novelty introduced into the system will also need
 *                   normalization.
 *   :remotes      - a vector of keywords representing remote services which can
 *                   evaluate query expressions. Defaults to [:remote]
 *   :root-render  - the root render function. Defaults to ReactDOM.render
 *   :root-unmount - the root unmount function. Defaults to
 *                   ReactDOM.unmountComponentAtNode
 *   :logger       - supply a goog.log compatible logger
 */
om.next.reconciler = (function om$next$reconciler(p__25024){
var map__25042 = p__25024;
var map__25042__$1 = ((((!((map__25042 == null)))?((((map__25042.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25042.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__25042):map__25042);
var config = map__25042__$1;
var root_render = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$root_DASH_render,((function (map__25042,map__25042__$1,config){
return (function (p1__25021_SHARP_,p2__25022_SHARP_){
return ReactDOM.render(p1__25021_SHARP_,p2__25022_SHARP_);
});})(map__25042,map__25042__$1,config))
);
var normalize = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$normalize);
var prune_tree = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$prune_DASH_tree,om.next.default_extract_errors);
var pathopt = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$pathopt,false);
var instrument = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$instrument);
var id_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$id_DASH_key);
var merge_sends = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$merge_DASH_sends,((function (map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key){
return (function (p1__25019_SHARP_,p2__25020_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__25019_SHARP_,p2__25020_SHARP_], 0));
});})(map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key))
);
var merge_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$merge_DASH_ident,om.next.default_merge_ident);
var remotes = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$remotes,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$remote], null));
var migrate = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$migrate,om.next.default_migrate);
var history = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$history,(100));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$state);
var merge = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$merge,om.next.default_merge);
var shared_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$shared_DASH_fn);
var ui__GT_props = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$ui_DASH__GT_props,om.next.default_ui__GT_props);
var parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$parser);
var indexer = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$indexer,om.next.indexer);
var root_unmount = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$root_DASH_unmount,((function (map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer){
return (function (p1__25023_SHARP_){
return ReactDOM.unmountComponentAtNode(p1__25023_SHARP_);
});})(map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer))
);
var send = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$send);
var merge_tree = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$merge_DASH_tree,om.next.default_merge_tree);
var shared = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25042__$1,cljs.core.cst$kw$shared);
var optimize = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__25042__$1,cljs.core.cst$kw$optimize,((function (map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared){
return (function (cs){
return cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(om.next.depth,cs);
});})(map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared))
);
if(cljs.core.map_QMARK_(config)){
} else {
throw (new Error("Assert failed: (map? config)"));
}

var idxr = (indexer.cljs$core$IFn$_invoke$arity$0 ? indexer.cljs$core$IFn$_invoke$arity$0() : indexer.call(null));
var norm_QMARK_ = ((!((state == null)))?((((state.cljs$lang$protocol_mask$partition1$ & (16384))) || (state.cljs$core$IAtom$))?true:(((!state.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IAtom,state):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IAtom,state));
var state_SINGLEQUOTE_ = ((norm_QMARK_)?state:(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.atom.call(null,state)));
var logger = ((cljs.core.contains_QMARK_(config,cljs.core.cst$kw$logger))?cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(config):om.next._STAR_logger_STAR_);
var ret = (new om.next.Reconciler(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$pathopt,cljs.core.cst$kw$id_DASH_key,cljs.core.cst$kw$instrument,cljs.core.cst$kw$merge_DASH_ident,cljs.core.cst$kw$merge_DASH_sends,cljs.core.cst$kw$remotes,cljs.core.cst$kw$migrate,cljs.core.cst$kw$history,cljs.core.cst$kw$state,cljs.core.cst$kw$merge,cljs.core.cst$kw$shared_DASH_fn,cljs.core.cst$kw$parser,cljs.core.cst$kw$ui_DASH__GT_props,cljs.core.cst$kw$logger,cljs.core.cst$kw$indexer,cljs.core.cst$kw$root_DASH_unmount,cljs.core.cst$kw$send,cljs.core.cst$kw$shared,cljs.core.cst$kw$merge_DASH_tree,cljs.core.cst$kw$optimize,cljs.core.cst$kw$root_DASH_render,cljs.core.cst$kw$normalize,cljs.core.cst$kw$prune_DASH_tree],[pathopt,id_key,(function (){var G__25047 = instrument;
if(!((instrument == null))){
return ((function (G__25047,idxr,norm_QMARK_,state_SINGLEQUOTE_,logger,map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared,optimize){
return (function om$next$reconciler_$_G__25047(x){
var _STAR_instrument_STAR_25049 = om.next._STAR_instrument_STAR_;
om.next._STAR_instrument_STAR_ = null;

try{return (instrument.cljs$core$IFn$_invoke$arity$1 ? instrument.cljs$core$IFn$_invoke$arity$1(x) : instrument.call(null,x));
}finally {om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_25049;
}});
;})(G__25047,idxr,norm_QMARK_,state_SINGLEQUOTE_,logger,map__25042,map__25042__$1,config,root_render,normalize,prune_tree,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared,optimize))
} else {
return G__25047;
}
})(),merge_ident,merge_sends,remotes,migrate,om.next.cache.cache(history),state_SINGLEQUOTE_,merge,shared_fn,parser,ui__GT_props,logger,idxr,root_unmount,send,shared,merge_tree,optimize,root_render,(function (){var or__6221__auto__ = !(norm_QMARK_);
if(or__6221__auto__){
return or__6221__auto__;
} else {
return normalize;
}
})(),prune_tree]),(function (){var G__25050 = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$normalized,cljs.core.cst$kw$remove,cljs.core.cst$kw$queue,cljs.core.cst$kw$sends_DASH_queued,cljs.core.cst$kw$queued_DASH_sends,cljs.core.cst$kw$queued,cljs.core.cst$kw$render,cljs.core.cst$kw$root,cljs.core.cst$kw$t,cljs.core.cst$kw$target],[norm_QMARK_,null,cljs.core.PersistentVector.EMPTY,false,cljs.core.PersistentArrayMap.EMPTY,false,null,null,(0),null]);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__25050) : cljs.core.atom.call(null,G__25050));
})(),null,null,null));
return ret;
});
/**
 * Returns true if x is a reconciler.
 */
om.next.reconciler_QMARK_ = (function om$next$reconciler_QMARK_(x){
return (x instanceof om.next.Reconciler);
});
/**
 * Return the reconciler's application state atom. Useful when the reconciler
 * was initialized via denormalized data.
 */
om.next.app_state = (function om$next$app_state(reconciler){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error("Assert failed: (reconciler? reconciler)"));
}

return cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler));
});
/**
 * Return the application's root component.
 */
om.next.app_root = (function om$next$app_root(reconciler){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error("Assert failed: (reconciler? reconciler)"));
}

return cljs.core.get.cljs$core$IFn$_invoke$arity$2((function (){var G__25265 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25265) : cljs.core.deref.call(null,G__25265));
})(),cljs.core.cst$kw$root);
});
/**
 * Force a re-render of the root. Not recommended for anything except
 * recomputing :shared.
 */
om.next.force_root_render_BANG_ = (function om$next$force_root_render_BANG_(reconciler){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error("Assert failed: (reconciler? reconciler)"));
}

return cljs.core.get.cljs$core$IFn$_invoke$arity$2((function (){var G__25267 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__25267) : cljs.core.deref.call(null,G__25267));
})(),cljs.core.cst$kw$render).call(null);
});
/**
 * Given a reconciler and UUID return the application state snapshost
 * from history associated with the UUID. The size of the reconciler history
 * may be configured by the :history option when constructing the reconciler.
 */
om.next.from_history = (function om$next$from_history(reconciler,uuid){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error("Assert failed: (reconciler? reconciler)"));
}

return cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler)).get(uuid);
});
/**
 * Return a temporary id.
 */
om.next.tempid = (function om$next$tempid(var_args){
var args25276 = [];
var len__7296__auto___25279 = arguments.length;
var i__7297__auto___25280 = (0);
while(true){
if((i__7297__auto___25280 < len__7296__auto___25279)){
args25276.push((arguments[i__7297__auto___25280]));

var G__25281 = (i__7297__auto___25280 + (1));
i__7297__auto___25280 = G__25281;
continue;
} else {
}
break;
}

var G__25278 = args25276.length;
switch (G__25278) {
case 0:
return om.next.tempid.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return om.next.tempid.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25276.length)].join('')));

}
});

om.next.tempid.cljs$core$IFn$_invoke$arity$0 = (function (){
return om.tempid.tempid.cljs$core$IFn$_invoke$arity$0();
});

om.next.tempid.cljs$core$IFn$_invoke$arity$1 = (function (id){
return om.tempid.tempid.cljs$core$IFn$_invoke$arity$1(id);
});

om.next.tempid.cljs$lang$maxFixedArity = 1;

/**
 * Return true if x is a tempid, false otherwise
 */
om.next.tempid_QMARK_ = (function om$next$tempid_QMARK_(x){
return om.tempid.tempid_QMARK_(x);
});
/**
 * Create a Om Next transit reader. This reader can handler the tempid type.
 * Can pass transit reader customization opts map.
 */
om.next.reader = (function om$next$reader(var_args){
var args25283 = [];
var len__7296__auto___25296 = arguments.length;
var i__7297__auto___25297 = (0);
while(true){
if((i__7297__auto___25297 < len__7296__auto___25296)){
args25283.push((arguments[i__7297__auto___25297]));

var G__25302 = (i__7297__auto___25297 + (1));
i__7297__auto___25297 = G__25302;
continue;
} else {
}
break;
}

var G__25292 = args25283.length;
switch (G__25292) {
case 0:
return om.next.reader.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return om.next.reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25283.length)].join('')));

}
});

om.next.reader.cljs$core$IFn$_invoke$arity$0 = (function (){
return om.transit.reader.cljs$core$IFn$_invoke$arity$0();
});

om.next.reader.cljs$core$IFn$_invoke$arity$1 = (function (opts){
return om.transit.reader.cljs$core$IFn$_invoke$arity$1(opts);
});

om.next.reader.cljs$lang$maxFixedArity = 1;

/**
 * Create a Om Next transit writer. This writer can handler the tempid type.
 * Can pass transit writer customization opts map.
 */
om.next.writer = (function om$next$writer(var_args){
var args25309 = [];
var len__7296__auto___25312 = arguments.length;
var i__7297__auto___25313 = (0);
while(true){
if((i__7297__auto___25313 < len__7296__auto___25312)){
args25309.push((arguments[i__7297__auto___25313]));

var G__25314 = (i__7297__auto___25313 + (1));
i__7297__auto___25313 = G__25314;
continue;
} else {
}
break;
}

var G__25311 = args25309.length;
switch (G__25311) {
case 0:
return om.next.writer.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return om.next.writer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25309.length)].join('')));

}
});

om.next.writer.cljs$core$IFn$_invoke$arity$0 = (function (){
return om.transit.writer.cljs$core$IFn$_invoke$arity$0();
});

om.next.writer.cljs$core$IFn$_invoke$arity$1 = (function (opts){
return om.transit.writer.cljs$core$IFn$_invoke$arity$1(opts);
});

om.next.writer.cljs$lang$maxFixedArity = 1;

/**
 * Given a query expression return an equivalent query expression that can be
 * spliced into a transaction that will force a read of that key from the
 * specified remote target.
 */
om.next.force = (function om$next$force(var_args){
var args25323 = [];
var len__7296__auto___25335 = arguments.length;
var i__7297__auto___25336 = (0);
while(true){
if((i__7297__auto___25336 < len__7296__auto___25335)){
args25323.push((arguments[i__7297__auto___25336]));

var G__25337 = (i__7297__auto___25336 + (1));
i__7297__auto___25336 = G__25337;
continue;
} else {
}
break;
}

var G__25334 = args25323.length;
switch (G__25334) {
case 1:
return om.next.force.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.force.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25323.length)].join('')));

}
});

om.next.force.cljs$core$IFn$_invoke$arity$1 = (function (expr){
return om.next.force.cljs$core$IFn$_invoke$arity$2(expr,cljs.core.cst$kw$remote);
});

om.next.force.cljs$core$IFn$_invoke$arity$2 = (function (expr,target){
return cljs.core.with_meta(cljs.core._conj((function (){var x__7055__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__7055__auto__);
})(),cljs.core.cst$sym$quote),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$target,target], null));
});

om.next.force.cljs$lang$maxFixedArity = 2;
