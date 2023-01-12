const vioService = {
    agFormSubmit(knex,
        name,
        company,
        phone,
        email,
        lat,
        lng,
        addressResult,
        iStakeholderText,
        iStakeholderOther,
        aStakeholderText,
        aStakeholderOther,
        iname,
        iphone,
        iemail,
        violation1,
        locCreate,
        noticeNo,
        damageAssoc,
        damageAmt,
        udText,
        pipeDamage,
        fireDept,
        vioDate,
        desc,
        nameList,
        creation,
        violationOther,
        exTypeOther,
        inOnSite,
        violation2,
        violation2Other,
        violation3,
        violation3Other) {
        return knex.raw(`
    INSERT INTO custom."agForm_main"
    (name, 
        company,
        phone, 
        email, 
        lat, 
        long, 
        address, 
        istakeholder, 
        istakeholderother, 
        violation1,  
        locatecreate, 
        locateno, 
        damageassoc, 
        damageamt, 
        typeofex, 
        pipelinedamage, 
        fdnotified,  
        descofincident, 
        dateofincident,
        partiesinvolved, 
        astakeholder, 
        astakeholderother, 
        iname, 
        iemail, 
        iphone, 
        creation, 
        createid,
        violationother,
        extypeother,
        ionsite,
        violation2,
        violation2other,
        violation3,
        violation3other)
    VALUES($$${name}$$, 
    $$${company}$$,
    '${phone}', 
    $$${email}$$, 
    ${lat}, 
    ${lng}, 
    $$${addressResult}$$, 
    '${iStakeholderText}', 
    $$${iStakeholderOther}$$,
    '${violation1}', 
    ${locCreate}, 
    '${noticeNo}', 
    ${damageAssoc},
    $$${damageAmt}$$,
    '${udText}',
    ${pipeDamage}, 
    ${fireDept}, 
    $$${desc}$$, 
    $$${vioDate}$$, 
    $$${nameList}$$, 
    '${aStakeholderText}', 
    '${aStakeholderOther}',
    $$${iname}$$,
    $$${iemail}$$,
    '${iphone}',
    now(),
    '${creation}',
    $$${violationOther}$$,
    $$${exTypeOther}$$,
    ${inOnSite},
    $$${violation2}$$,
    $$${violation2Other}$$,
    $$${violation3}$$,
    $$${violation3Other}$$)`)
    },

    noticeInfo(knex, number) {
        return knex.raw(`
        SELECT t."ID" as "TicketId"
	   ,t."TicketNumber"
       ,t."Version"
       ,tdf."FieldValue" as "Source"
       ,regexp_replace(p."FirstName",E'[\\n\\r]+', ' ', 'g') as "TakenByFirstName"
       ,regexp_replace(p."LastName",E'[\\n\\r]+', ' ', 'g')  as "TakenByLastName"
       ,t."ParentTicketID" 
       ,te."ExcavatorID" 
       ,regexp_replace((case when te."CompanyName" is null then te."ContactName" else te."CompanyName" end), E'[\\n\\r]+', ' ', 'g') as "ExcavatorName"
       ,ect."Name" as "ExcavatorType" 
       ,te."OfficeCity" as "ExcavatorCity" 
       ,te."OfficeState" as "ExcavatorState" 
       ,te."OfficeZip" as "ExcavatorZip" 
       ,regexp_replace(te."ContactName",E'[\\n\\r]+', ' ', 'g') as "ExcavatorCaller" 
       ,regexp_replace(te."ContactEmail",E'[\\n\\r]+', ' ', 'g') as "ExcavatorCallerEmail" 
       ,case when t."Status" = 4 then 'Void'
             when tf."Name" not in ('New','Multiple') and t."Status" = 2 then tf."Name" else tt."Name" end as "TicketType"
       ,ta."WorkType" 
       ,tdsi."State" as "WorkState"
       ,tdsi."CountyName"  as "WorkCounty"
       ,tdsi."PlaceName"  as "WorkPlace"
       ,t."WorkStartDate"::timestamp as "WorkOn"
       ,regexp_replace(ta."WorkDoneFor",E'[\\n\\r]+', ' ', 'g') as "WorkDoneFor"
       ,regexp_replace(ta."DurationText",E'[\\n\\r]+', ' ', 'g') as "Duration"
       ,case when ta."WhiteLined" = 'true' then 1 else 0 end as "IsWhitePaint"
       ,case when ta."Explosives" = 'true' then 1 else 0 end as "Explosives"
       ,case when tdf2."FieldValue" = 'True' then 1 else 0 end as "DrillingOrBoring"
       ,t."TakenEndDate"::timestamp as "Creation"
       ,t."ExpiresDate"::timestamp
       ,ta."RestakeDate"::timestamp as "UpdateBy"
        FROM "public"."Tickets" t
                left join "public"."TicketDynamicFields" tdf on t."ID" = tdf."TicketID" and tdf."FieldName" = 'CallerSourceType'
                left join "public"."TicketDynamicFields" tdf2 on t."ID" = tdf2."TicketID" and tdf2."FieldName" = 'DrillingOrBoring'
                left join "public"."TicketDigSites" tds on t."ID" = tds."TicketID" 
                left join "public"."TicketDigSiteIntersections" tdsi on tds."ID" = tdsi."TicketDigSiteID"
                left join "Configuration"."TicketTypes" tt on t."TicketTypeID" = tt."ID"
                left join "Configuration"."TicketFunctions" tf on t."TicketFunctionID" = tf."ID"
                left join "public"."TicketExcavators" te on t."ID" = te."TicketID"
                left join "Configuration"."ExcavatorCompanyTypes" ect on te."CompanyTypeID"  = ect."ID"
                left join "public"."TicketAncillary" ta on t."ID"  = ta."TicketID"
                left join "public"."People" p on t."AgentPersonID" = p."ID" 
        where t."TicketNumber" = '${number}'
        `)
    }

    module.exports = vioService