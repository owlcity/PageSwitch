if (typeof AppPlatform == "undefined")
{
	var AppPlatform = new Object();
}

AppPlatform.Browser = new Object();
AppPlatform.Browser.ua = window.navigator.userAgent.toLowerCase();
AppPlatform.Browser.ie = /msie/.test(AppPlatform.Browser.ua);
AppPlatform.Browser.moz = /gecko/.test(AppPlatform.Browser.ua);

AppPlatform.$ = function(s)
{
	return (typeof s == "object") ? s: document.getElementById(s);
};

AppPlatform.Element = {
	getElementLeft: function(e)
	{
		return (e==null) ? 0 :
			(AppPlatform.$(e).offsetLeft + AppPlatform.Element.getElementLeft(AppPlatform.$(e).offsetParent));
	},

	getElementTop: function(e)
	{
		return (e==null) ? 0 :
			(AppPlatform.$(e).offsetTop + AppPlatform.Element.getElementTop(AppPlatform.$(e).offsetParent));
	},

	scrollIntoView: function(e)
	{
		var x = AppPlatform.Element.getElementLeft(e);
		var y = AppPlatform.Element.getElementTop(e);
		window.scrollTo(x, y);
	},

	remove: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			try
			{
				AppPlatform.$(arguments[i]).parentNode.removeChild(AppPlatform.$(arguments[i]));
			}
			catch (e)
			{
			}
		}
	}
};

AppPlatform.JsLoader = {
	PrjId: 0,
	load: function(sId, sUrl, fCallback)
	{
		AppPlatform.Element.remove(sId);

		var _script = document.createElement("script");
		_script.setAttribute("id", sId);
		_script.setAttribute("type", "text/javascript");
		_script.setAttribute("src", sUrl);

		if (AppPlatform.Browser.ie)
		{
			_script.onreadystatechange = function()
			{
				if (this.readyState=="loaded" || this.readyState=="complete")
				{
					AppPlatform.Element.remove(_script);
					fCallback();
				}
			};
		}
		else if (AppPlatform.Browser.moz)
		{
			_script.onload = function()
			{
				AppPlatform.Element.remove(_script);
				fCallback();
			};
		}
		else
		{
			AppPlatform.Element.remove(_script);
			fCallback();
		}

		document.getElementsByTagName("head")[0].appendChild(_script);
	}
};

if (typeof AppPlatform.Survey == "undefined")
{
	AppPlatform.Survey = new Object();
}

if (typeof AppPlatform.Survey.Digg == "undefined")
{
	AppPlatform.Survey.Digg = {
		ProjectList: {},

		loadDiggResult: function(projId)
		{
			var OptIdList = "";
			for (i=0; i<AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray.length; i++)
			{
				if (0 != i)
				{
					OptIdList += "|";
				}

				OptIdList += AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray[i];
			}

			var LoadUrl = "http://page.vote.qq.com/api.php?id=" +
				AppPlatform.Survey.Digg.ProjectList[projId].ProjectId;
			LoadUrl += "&subjid=";
			LoadUrl += AppPlatform.Survey.Digg.ProjectList[projId].SubjectId;

			if ("" != OptIdList)
			{
				LoadUrl += "&optidlist=";
				LoadUrl += OptIdList;
			}

			LoadUrl += "&type=result";
			LoadUrl += "&rdm=" + Math.random();

			AppPlatform.JsLoader.load(projId, LoadUrl, function()
			{
				AppPlatform.Survey.Digg.showDiggResult(projId);
			});
		},

		init: function(surveyObj)
		{
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId] = {};
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].ProjectId = surveyObj.PrjId;
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].SubjectId = surveyObj.SubjId;
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].DiggMode = surveyObj.DiggMode;
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].IsShowResult = surveyObj.ShowResult;
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].OptIdObject = surveyObj.OptIdObject;
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].OptIdArray = new Array();
			AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].OptListCount = new Array();
			for (var o in surveyObj.OptIdObject)
			{
				AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].OptIdArray.push(o);
			}

			if (AppPlatform.Survey.Digg.ProjectList[surveyObj.PrjId].IsShowResult)
			{
				AppPlatform.Survey.Digg.loadDiggResult(surveyObj.PrjId);
			}
		},

		showDiggResult: function(projId)
		{
			var VariableStr =  "survey_result_" + AppPlatform.Survey.Digg.ProjectList[projId].ProjectId;
			if (0 != eval(VariableStr).errcode)
			{
				return false;
			}

			var ResultStr = eval(VariableStr).result;
			var ResultArray = ResultStr.split("-");
			var SubjId = ResultArray[0];

			if (AppPlatform.Survey.Digg.ProjectList[projId].SubjectId != SubjId)
			{
				return;
			}

			var OptTmpArray = ResultArray[1].split(";");
			for (i=0; i<OptTmpArray.length; i++)
			{
				var TmpArray = OptTmpArray[i].split(":");
				if (TmpArray.length < 3)
				{
					continue;
				}

				var OptId = TmpArray[0];
				AppPlatform.Survey.Digg.ProjectList[projId].OptListCount[OptId] =
					{"count":TmpArray[1], "percent":TmpArray[2]};

			}

			for (i=0; i<AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray.length; i++)
			{
				var IndexId = AppPlatform.Survey.Digg.ProjectList[projId].OptIdObject[AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray[i]];
				var OptId = AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray[i];
				try
				{
					AppPlatform.$('apps_svy_opt_count_' + projId + '_' + IndexId).innerHTML =
						AppPlatform.Survey.Digg.ProjectList[projId].OptListCount[OptId].count;
					AppPlatform.$('apps_svy_opt_title_' + projId + '_' + IndexId).innerHTML = 
						'<a href="javascript:AppPlatform.Survey.Digg.digg(this, ' +
						projId + ', ' +
						AppPlatform.Survey.Digg.ProjectList[projId].SubjectId +
						', '+OptId+');" target=\"_self\">' +
						AppPlatform.$('apps_svy_opt_title_' + projId + '_' + IndexId).innerHTML + '</a>';
				}
				catch (e)
				{
				}
			}
		},

		ReceiveDiggResult: function()
		{
			return;
		},

		digg: function(obj, projId, subjId, optId)
		{
			var IndexId = AppPlatform.Survey.Digg.ProjectList[projId].OptIdObject[optId];
			AppPlatform.Survey.Digg.ProjectList[projId].OptListCount[optId].count++;
			AppPlatform.$('apps_svy_opt_count_' + projId + '_' + IndexId).innerHTML =
				AppPlatform.Survey.Digg.ProjectList[projId].OptListCount[optId].count;
			AppPlatform.$('apps_svy_opt_title_' + projId + '_' + IndexId).innerHTML =
				AppPlatform.$('apps_svy_opt_title_' + projId + '_' + IndexId).getAttribute("doneText");

			if (AppPlatform.Survey.Digg.ProjectList[projId].DiggMode == 0)
			{
				for (i=0; i<AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray.length; i++)
				{
					var IndexId = AppPlatform.Survey.Digg.ProjectList[projId].OptIdObject[AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray[i]];
					var OptId = AppPlatform.Survey.Digg.ProjectList[projId].OptIdArray[i];
					try
					{
						AppPlatform.$('apps_svy_opt_title_' + projId + '_' + IndexId).innerHTML =
							AppPlatform.$('apps_svy_opt_title_' + projId + '_' + IndexId).getAttribute("doneText");
					}
					catch (e)
					{
					}
				}
			}

			var SubmitUrl = "http://page.vote.qq.com/survey.php?PjtID=" + projId;
			SubmitUrl += "&SubjID=";
			SubmitUrl += subjId;
			SubmitUrl += "&OptID=";
			SubmitUrl += optId;
			SubmitUrl += "&fmt=json";
			SubmitUrl += "&result=0";
			SubmitUrl += "&rdm=" + Math.random();

			AppPlatform.JsLoader.load(projId, SubmitUrl, function()
			{
				AppPlatform.Survey.Digg.ReceiveDiggResult(projId);
			});
		}
	};
}/*  |xGv00|7ad790f9c28894edc3717cb558a1042e */