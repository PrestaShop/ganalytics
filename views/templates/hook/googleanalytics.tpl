<script async src='https://www.googletagmanager.com/gtag/js?id={$ga_measurement_id}'></script>
<script type="text/javascript">
    {literal}
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    {/literal}
    {if isset($back_office) && $back_office == true}
    gtag('config', '{$ga_measurement_id}', { 'send_page_view': false } );
    {else}
    gtag('config', '{$ga_measurement_id}');
    {/if}
    {if isset($user_id)}
    gtag('config', '{$ga_measurement_id}', { 'user_id': '{$user_id}' } );
    {/if}
</script>

